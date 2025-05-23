import LEVELS from "./gameLayout";
import { translations, Language } from './translations';

interface Block {
  type: string;
  x: number;
  y: number;
  char?: string; // Add this property
}

interface BlockType {
  width: number;
  height: number;
  char: string;
  class?: string;
}

interface Position {
  x: number;
  y: number;
}

export class HuarongGame {
  private readonly BOARD_WIDTH = 4;
  private readonly BOARD_HEIGHT = 5;
  private moves = 0;
  private bestScore: number | string;
  private moveHistory: string[] = [];
  private selectedPiece: number | null = null;
  private blocks: Block[];
  private userId: string | null = null;
  private currentLevel: number;
  private language: Language = navigator.language.toLowerCase().startsWith('en') ? 'en' : 'zh';
  private slideSound = new Audio("slideBlock.mp3");

  private generals = ["张飞", "马超", "赵云", "黄忠"];
  private generalIndex = 0;
  private horizontalGenerals = ["关羽", "周仓", "魏延", "庞德"];
  private horizontalIndex = 0;

  private BLOCKS: { [key: string]: BlockType };

  private getNextGeneral(): string {
    const char = this.generals[this.generalIndex];
    this.generalIndex = (this.generalIndex + 1) % this.generals.length;
    return char;
  }

  private getNextHorizontalGeneral(): string {
    const char = this.horizontalGenerals[this.horizontalIndex];
    this.horizontalIndex = (this.horizontalIndex + 1) % this.horizontalGenerals.length;
    return char;
  }

  constructor(level: number = 0) {
    this.BLOCKS = {
      CAO_CAO: { width: 2, height: 2, char: "曹操", class: "cao" },
      VERTICAL: { width: 1, height: 2, char: "将军" },
      HORIZONTAL: { width: 2, height: 1, char: "将军" },
      SINGLE: { width: 1, height: 1, char: "兵" },
    };
    this.slideSound.volume = 0.2;
    this.currentLevel = level;
    this.bestScore = "-";
    this.blocks = JSON.parse(JSON.stringify(LEVELS[level].layout));
    
    // Assign character names to blocks
    this.blocks.forEach(block => {
      if (block.type === 'VERTICAL') {
        block.char = this.getNextGeneral();
      } else if (block.type === 'HORIZONTAL') {
        block.char = this.getNextHorizontalGeneral();
      }
    });

    this.initializeGame();
    this.initializeLevelSelector();
    this.initializeLanguageSelector();
    this.initializeHintSystem();
  }

  private initializeHintSystem() {
    const levelDesc = document.getElementById("levelDescription")!;
    levelDesc.innerHTML = `<p>${LEVELS[this.currentLevel].description}</p>`;
  }

  async promptForUserId(): Promise<string | null> {
    const id = prompt(
      "Congratulations, you won! Enter your user ID to save your score:"
    );
    if (id) {
      this.userId = id;
      const existingBestScore = localStorage.getItem(`bestScore_${id}`);
      if (existingBestScore) {
        this.bestScore = parseInt(existingBestScore);
        this.updateStats();
      }
    }
    return id;
  }

  initializeGame() {
    const board = document.getElementById("board");
    if (!board) return;
    board.innerHTML = "";
    this.createBoard();
    this.renderPieces();
    this.updateStats();
    this.updateUIText();

    const resetBtn = document.getElementById("resetBtn");
    resetBtn?.addEventListener("click", () => this.resetGame());

    const undoBtn = document.getElementById("undoBtn");
    undoBtn?.addEventListener("click", () => this.undoMove());
  }

  private initializeLevelSelector() {
    const levelSelector = document.getElementById(
      "levelSelector"
    ) as HTMLSelectElement;
    if (levelSelector) {
      levelSelector.value = this.currentLevel.toString();
      levelSelector.addEventListener("change", (e) => {
        const newLevel = parseInt((e.target as HTMLSelectElement).value);
        this.changeLevel(newLevel);
      });
    }
  }

  private initializeLanguageSelector() {
    const languageSelector = document.getElementById('languageSelector') as HTMLSelectElement;
    languageSelector.value = this.language;
    languageSelector.addEventListener('change', (e) => {
      this.language = (e.target as HTMLSelectElement).value as Language;
      this.updateUIText();
    });
  }

  private updateUIText() {
    const t = translations[this.language];
    document.querySelector('h1')!.textContent = t.title;
    document.getElementById('resetBtn')!.textContent = t.reset;
    document.getElementById('undoBtn')!.textContent = t.undo;
    
    // Update tooltip content
    const tooltipHeader = document.querySelector('.tooltip-header')!;
    const tooltipIntro = document.querySelector('.tooltip-content > p')!;
    const levelDesc = document.getElementById('levelDescription')!;

    tooltipHeader.textContent = t.title;
    tooltipIntro.textContent = t.gameIntro;
    
    // Find current level info
    const currentLevelInfo = t.levels.find(level => level.id === LEVELS[this.currentLevel].name);
    levelDesc.innerHTML = `
      <h3>${currentLevelInfo?.name}</h3>
      <p>${currentLevelInfo?.description}</p>
    `;

    // Update level selector options
    const levelSelector = document.getElementById('levelSelector') as HTMLSelectElement;
    t.levels.forEach((level, index) => {
      levelSelector.options[index].text = `${t.level} ${index + 1}: ${level.name}`;
    });

    // Update stats display
    document.querySelector('.stats')!.innerHTML = 
      `${t.moves}: <span id="moveCount">${this.moves}</span> | ${t.best}: <span id="bestScore">${this.bestScore}</span>`;
  }

  private changeLevel(level: number) {
    this.currentLevel = level;
    this.blocks = JSON.parse(JSON.stringify(LEVELS[level].layout));
    
    // Reset indices and assign new characters for new level
    this.generalIndex = 0;
    this.horizontalIndex = 0;
    this.blocks.forEach(block => {
      if (block.type === 'VERTICAL') {
        block.char = this.getNextGeneral();
      } else if (block.type === 'HORIZONTAL') {
        block.char = this.getNextHorizontalGeneral();
      }
    });

    this.moves = 0;
    this.moveHistory = [];
    this.selectedPiece = null;
    if (!this.userId) {
      this.bestScore = "-";
    } else {
      const existingBestScore = localStorage.getItem(
        `bestScore_${this.userId}_level${level}`
      );
      this.bestScore = existingBestScore ? parseInt(existingBestScore) : "-";
    }
    this.updateStats();
    this.renderPieces();
    const t = translations[this.language];
    const currentLevelInfo = t.levels.find(level => level.id === LEVELS[this.currentLevel].name);
    const levelDesc = document.getElementById("levelDescription")!;
    levelDesc.innerHTML = `
      <h3>${currentLevelInfo?.name}</h3>
      <p>${currentLevelInfo?.description}</p>
    `;
  }

  createBoard() {
    const board = document.getElementById("board");
    if (!board) return;
    board.style.gridTemplateColumns = `repeat(${this.BOARD_WIDTH}, var(--cell-size))`; //这将创建一个5列的网格，每列的宽度 --cell-size 变量定义的值。
    board.style.gridTemplateRows = `repeat(${this.BOARD_HEIGHT}, var(--cell-size))`;
  }

  renderPieces() {
    const board = document.getElementById("board");
    if (!board) return;
    board.innerHTML = "";

    this.blocks.forEach((block, index) => {
      const blockType = { ...this.BLOCKS[block.type] };
      const piece = document.createElement("div");
      piece.className = `piece ${blockType.class || ""}`;
      piece.textContent = block.char || blockType.char; // Use stored character
      piece.style.gridColumn = `${block.x + 1} / span ${blockType.width}`;
      piece.style.gridRow = `${block.y + 1} / span ${blockType.height}`;
      piece.dataset.index = index.toString();

      piece.addEventListener("click", () => this.handlePieceClick(index));
      board.appendChild(piece);
    });
  }

  handlePieceClick(index: number) {
    // Remove any existing arrows first
    document
      .querySelectorAll(".direction-arrow")
      .forEach((arrow) => arrow.remove());

    const block = this.blocks[index];
    const moves = this.getPossibleMoves(block);

    if (moves.length === 0) {
      return; // Can't move
    } else if (moves.length === 1) {
      this.moveToPosition(index, moves[0]);
    } else {
      this.showMoveOptions(index, moves);
    }
  }

  showMoveOptions(index: number, moves: Position[]) {
    const block = this.blocks[index];
    const piece = document.querySelector(`[data-index="${index}"]`);
    const board = document.getElementById("board");
    if (!piece || !board) return;
    const rect = piece.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    // Remove any existing arrows
    document
      .querySelectorAll(".direction-arrow")
      .forEach((arrow) => arrow.remove());

    moves.forEach((move) => {
      const arrow = document.createElement("div");
      arrow.className = "direction-arrow";

      // Calculate position relative to the piece
      const direction = this.getDirectionText(block, move);
      const svgIcon = this.getDirectionSVG(direction);

      // Position the arrow based on direction
      const pieceWidth = rect.width;
      const pieceHeight = rect.height;
      const arrowSize = 34;
      let left, top;

      switch (direction) {
        case "Left":
          left = rect.left - boardRect.left - arrowSize;
          top = rect.top - boardRect.top + pieceHeight / 2 - arrowSize / 2 - 3;
          break;
        case "Right":
          left = rect.right - boardRect.left - 7;
          top = rect.top - boardRect.top + pieceHeight / 2 - arrowSize / 2 - 3;
          break;
        case "Up":
          left = rect.left - boardRect.left + pieceWidth / 2 - arrowSize / 2 - 3;
          top = rect.top - boardRect.top - arrowSize;
          break;
        case "Down":
          left = rect.left - boardRect.left + pieceWidth / 2 - 20;
          top = rect.bottom - boardRect.top - 7;
          break;
      }

      arrow.style.left = `${left}px`;
      arrow.style.top = `${top}px`;
      arrow.innerHTML = svgIcon;

      arrow.onclick = () => {
        this.moveToPosition(index, move);
        document
          .querySelectorAll(".direction-arrow")
          .forEach((a) => a.remove());
      };

      board.appendChild(arrow);
    });
  }

  getDirectionText(block: Block, move: Position) {
    if (move.x < block.x) return "Left";
    if (move.x > block.x) return "Right";
    if (move.y < block.y) return "Up";
    return "Down";
  }

  getDirectionSVG(direction: string) {
    const svgs = {
      Right: `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12Z" fill="#000000"></path></svg>`,
      Left: `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12Z" fill="#000000"></path></svg>`,
      Up: `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" fill="#000000"></path></svg>`,
      Down: `<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21Z" fill="#000000"></path></svg>`,
    };
    return svgs[direction as keyof typeof svgs];
  }

  moveToPosition(blockIndex: number, position: Position) {
    this.moveHistory.push(JSON.stringify(this.blocks));
    const block = this.blocks[blockIndex];
    block.x = position.x;
    block.y = position.y;
    this.moves++;
    this.slideSound.play();
    this.updateStats();
    this.renderPieces();
    this.checkWin(block);
  }

  updatePieceSelection() {
    document.querySelectorAll(".piece").forEach((piece) => {
      (piece as HTMLElement).style.filter = "none";
    });
    if (this.selectedPiece !== null) {
      const piece = document.querySelector(
        `[data-index="${this.selectedPiece}"]`
      );
      if (piece) {
        (piece as HTMLElement).style.filter = "brightness(1.2)";
      }
    }
  }

  isAdjacent(block1: Block, block2: Block) {
    const b1Type = this.BLOCKS[block1.type];
    const b2Type = this.BLOCKS[block2.type];

    const b1Right = block1.x + b1Type.width;
    const b1Bottom = block1.y + b1Type.height;
    const b2Right = block2.x + b2Type.width;
    const b2Bottom = block2.y + b2Type.height;

    return (
      (Math.abs(b1Right - block2.x) === 0 &&
        this.hasVerticalOverlap(block1, block2)) ||
      (Math.abs(block1.x - b2Right) === 0 &&
        this.hasVerticalOverlap(block1, block2)) ||
      (Math.abs(b1Bottom - block2.y) === 0 &&
        this.hasHorizontalOverlap(block1, block2)) ||
      (Math.abs(block1.y - b2Bottom) === 0 &&
        this.hasHorizontalOverlap(block1, block2))
    );
  }

  hasVerticalOverlap(block1: Block, block2: Block) {
    const b1Type = this.BLOCKS[block1.type];
    const b2Type = this.BLOCKS[block2.type];
    return !(
      block1.y >= block2.y + b2Type.height ||
      block2.y >= block1.y + b1Type.height
    );
  }

  hasHorizontalOverlap(block1: Block, block2: Block) {
    const b1Type = this.BLOCKS[block1.type];
    const b2Type = this.BLOCKS[block2.type];
    return !(
      block1.x >= block2.x + b2Type.width || block2.x >= block1.x + b1Type.width
    );
  }

  getPossibleMoves(block: Block) {
    const moves: Position[] = [];
    [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ].forEach(([dx, dy]) => {
      const newX = block.x + dx;
      const newY = block.y + dy;

      if (this.isValidMove(block, newX, newY)) {
        moves.push({ x: newX, y: newY });
      }
    });

    return moves;
  }

  isValidMove(block: Block, newX: number, newY: number) {
    const blockType = this.BLOCKS[block.type];

    if (
      newX < 0 ||
      newY < 0 ||
      newX + blockType.width > this.BOARD_WIDTH ||
      newY + blockType.height > this.BOARD_HEIGHT
    ) {
      return false;
    }

    return !this.blocks.some((otherBlock) => {
      if (block === otherBlock) return false;

      const otherType = this.BLOCKS[otherBlock.type];
      return this.rectsIntersect(
        { x: newX, y: newY, w: blockType.width, h: blockType.height },
        {
          x: otherBlock.x,
          y: otherBlock.y,
          w: otherType.width,
          h: otherType.height,
        }
      );
    });
  }

  rectsIntersect(
    r1: { x: number; y: number; w: number; h: number },
    r2: { x: number; y: number; w: number; h: number }
  ) {
    return !(
      r2.x >= r1.x + r1.w ||
      r2.x + r2.w <= r1.x ||
      r2.y >= r1.y + r1.h ||
      r2.y + r2.h <= r1.y
    );
  }

  checkWin(block: Block) {
    if (block.type === "CAO_CAO" && block.y === this.BOARD_HEIGHT - 2) {
      const handleWin = async () => {
        if (!this.userId) {
          const id = await this.promptForUserId();
          if (!id) {
            alert(
              `Congratulations! You won in ${this.moves} moves! (Score not saved)`
            );
            this.resetGame();
            return;
          }
        }

        if (this.userId) {
          const scoreKey = `bestScore_${this.userId}_level${this.currentLevel}`;
          const currentBest = localStorage.getItem(scoreKey);
          if (!currentBest || this.moves < Number(currentBest)) {
            this.bestScore = this.moves;
            localStorage.setItem(scoreKey, this.moves.toString());
          }
        }

        alert(`Congratulations! You won in ${this.moves} moves!`);
        this.resetGame();
      };

      setTimeout(handleWin, 100);
    }
  }

  undoMove() {
    if (this.moveHistory.length > 0) {
      const lastMove = this.moveHistory.pop();
      if (lastMove) {
        this.blocks = JSON.parse(lastMove);
      }
      this.moves--;
      this.updateStats();
      this.renderPieces();
    }
  }

  resetGame() {
    document
      .querySelectorAll(".direction-arrow")
      .forEach((arrow) => arrow.remove());
    this.generalIndex = 0;
    this.horizontalIndex = 0;
    this.blocks = JSON.parse(JSON.stringify(LEVELS[this.currentLevel].layout));
    this.blocks.forEach(block => {
      if (block.type === 'VERTICAL') {
        block.char = this.getNextGeneral();
      } else if (block.type === 'HORIZONTAL') {
        block.char = this.getNextHorizontalGeneral();
      }
    });
    this.moves = 0;
    this.moveHistory = [];
    this.selectedPiece = null;
    if (!this.userId) {
      this.bestScore = "-";
    }
    this.updateStats();
    this.renderPieces();
    this.updateUIText();
  }

  updateStats() {
    const moveCount = document.getElementById("moveCount");
    const bestScore = document.getElementById("bestScore");
    if (moveCount) {
      moveCount.textContent = this.moves.toString();
    }
    if (bestScore) {
      bestScore.textContent = this.bestScore.toString();
    }
  }
}
