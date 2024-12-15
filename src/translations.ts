export const translations = {
  en: {
    title: "Huarong Dao",
    level: "Level",
    reset: "Reset Game",
    undo: "Undo Move",
    moves: "Moves",
    best: "Best"
  },
  zh: {
    title: "华容道",
    level: "关卡",
    reset: "重新开始",
    undo: "撤销",
    moves: "步数",
    best: "最佳成绩"
  }
};

export type Language = keyof typeof translations;
