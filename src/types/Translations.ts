export interface TranslationKeys {
  title: string;
  moves: string;
  best: string;
  reset: string;
  undo: string;
  congrats: string;
  enterUserId: string;
  levels: {
    [key: string]: string;
  };
}

export interface Translations {
  [key: string]: TranslationKeys;
}