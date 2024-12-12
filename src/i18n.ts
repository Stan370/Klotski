export const translations = {
  en: {
    title: "Huarong Dao",
    moves: "Moves",
    best: "Best",
    reset: "Reset Game",
    undo: "Undo Move",
    congrats: "Congratulations! You won in {moves} moves!",
    enterUserId: "Enter your user ID to save your score:",
    levels: {
      横刀立马: "Crossing Swords",
      指挥若定: "Calm Command",
      将撞曹营: "Attacking Cao's Camp",
      齐头并进: "Moving Together",
      兵分三路: "Three-Way Split",
      雨声淅沥: "Rain Drizzling",
    },
  },
  zh: {
    title: "华容道",
    moves: "步数",
    best: "最佳",
    reset: "重新开始",
    undo: "撤销",
    congrats: "恭喜！你用了 {moves} 步完成了游戏！",
    enterUserId: "请输入用户ID以保存得分：",
    levels: {
      横刀立马: "横刀立马",
      指挥若定: "指挥若定",
      将撞曹营: "将撞曹营",
      齐头并进: "齐头并进",
      兵分三路: "兵分三路",
      雨声淅沥: "雨声淅沥",
    },
  },
};

export class I18n {
  private static currentLang: "en" | "zh" = navigator.language.startsWith("zh")
    ? "zh"
    : "en";

  static setLanguage(lang: "en" | "zh") {
    this.currentLang = lang;
  }

  static t(key: string, params: Record<string, any> = {}): string {
    const keys = key.split(".");
    let value = translations[this.currentLang];

    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }

    if (typeof value === "string") {
      return Object.entries(params).reduce(
        (str, [key, val]) => str.replace(`{${key}}`, val.toString()),
        value
      );
    }

    return key;
  }
}

export const t = I18n.t;
export class LanguageSelector {
  static create(): HTMLSelectElement {
    const select = document.createElement("select");
    select.id = "langSelector";

    const options = [
      { value: "en", text: "English" },
      { value: "zh", text: "中文" },
    ];

    options.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.text;
      select.appendChild(option);
    });

    select.value = navigator.language.startsWith("zh") ? "zh" : "en";

    return select;
  }
}
