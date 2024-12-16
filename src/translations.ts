export const translations = {
  en: {
    title: "Huarong Dao",
    level: "Level",
    reset: "Reset Game",
    undo: "Undo Move",
    moves: "Moves",
    best: "Best",
    gameIntro: "Huarong Dao(Aka. Klotski) is an ancient Chinese puzzle game based on the historical story of Cao Cao being surrounded at Huarong Path. The goal is to help Cao Cao (2x2 block) escape through the exit. Common goals are to solve the puzzle with a minimum number of moves or in a minimum amount of time.",
    levels: [
      {
        id: "横刀立马",
        name: "Horizontal Blade", 
        description: "Difficulty:★★★★ Based on the historical moment when Cao Cao was trapped at Huarong Path and Guan Yu let him escape. Best solution: 81 moves."
      },
      {
        id: "指挥若定",
        name: "Commanding Position",       
        description: "Difficulty: ★★★ Carefully analyze the movement paths of each general. Best solution: 70 moves."
      },
      {
        id: "水泄不通",
        name: "No Way Out",        
        description: "Difficulty: ★★★★ Surrounded on all sides, requires clever maneuvering. Best solution: 79 moves."
      },
      {
        id: "四面楚歌",
        name: "Enemies All Around",        
        description: "Difficulty: ★★★ Challenging layout, Surrounded by enemies, find the breakthrough point. Best solution: 56 moves."
      },
      {
        id: "兵分三路",
        name: "Three-Way Split",        
        description: "Difficulty: ★★★★ Enemy forces are scattered, find the right moment to break through, its a tactical challenge. Best solution: 72 moves."
      }
    ]
  },
  zh: {
    title: "华容道",
    level: "关卡",
    reset: "重新开始",
    undo: "撤销",
    moves: "步数",
    best: "最佳成绩",
    gameIntro: "华容道是一种古老的中国益智游戏，以三国时期曹操被围困华容道的历史故事为背景。游戏目标是通过移动棋子，帮助曹操（2x2红色方块）逃出华容道。",
    levels: [
      {
        id: "横刀立马",
        name: "横刀立马",
        description: "难度：★★★★ 经典布局。最优解：81步。"
      },
      {
        id: "指挥若定",
        name: "指挥若定",
        description: "难度：★★★ 战略布局。最优解：70步。"
      },
      {
        id: "水泄不通",
        name: "水泄不通",
        description: "难度：★★★★ 复杂布局。最优解：79步。"
      },
      {
        id: "四面楚歌",
        name: "四面楚歌",
        description: "难度：★★★ 挑战布局。最优解：56步。"
      },
      {
        id: "兵分三路",
        name: "兵分三路",
        description: "难度：★★★★ 战术布局。最优解：72步。"
      }
    ]
  }
};

export type Language = keyof typeof translations;
