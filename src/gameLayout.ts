// <!-- 经典五关（横刀立马、指挥若定、水泄不通、四面楚歌、兵分三路） -->

interface Block {
  type: "VERTICAL" | "CAO_CAO" | "HORIZONTAL" | "SINGLE";
  x: number;
  y: number;
}

interface Level {
  name: string;
  layout: Block[];
  description?: string; // Add description field
}

const LEVELS: Level[] = [
  {
    name: "横刀立马",
    description: "相传曹操在赤壁之战后被围困于华容道，关羽放他离去。此局难度：★★★",
    layout: [
      { type: "CAO_CAO", x: 1, y: 0 },
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "VERTICAL", x: 3, y: 0 },
      { type: "VERTICAL", x: 0, y: 2 },
      { type: "VERTICAL", x: 3, y: 2 },
      { type: "HORIZONTAL", x: 1, y: 2 },
      { type: "SINGLE", x: 1, y: 3 },
      { type: "SINGLE", x: 2, y: 3 },
      { type: "SINGLE", x: 0, y: 4 },
      { type: "SINGLE", x: 3, y: 4 },
    ],
  },
  {
    name: "指挥若定",
    description: "需要仔细分析每个将领的移动路线。此局难度：★★",
    layout: [
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "CAO_CAO", x: 1, y: 0 },
      { type: "VERTICAL", x: 3, y: 0 },
      { type: "VERTICAL", x: 3, y: 3 },
      { type: "VERTICAL", x: 0, y: 3 },
      { type: "HORIZONTAL", x: 1, y: 2 },
      { type: "SINGLE", x: 0, y: 2 },
      { type: "SINGLE", x: 1, y: 3 },
      { type: "SINGLE", x: 2, y: 3 },
      { type: "SINGLE", x: 3, y: 2 },
    ],
  },
  {
    name: "水泄不通",
    description: "四周被重重包围，需要巧妙调度。此局难度：★★★★",
    layout: [
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "CAO_CAO", x: 1, y: 0 },
      { type: "SINGLE", x: 3, y: 0 },
      { type: "SINGLE", x: 3, y: 1 },
      { type: "HORIZONTAL", x: 0, y: 2 },
      { type: "HORIZONTAL", x: 0, y: 3 },
      { type: "HORIZONTAL", x: 2, y: 3 },
      { type: "HORIZONTAL", x: 2, y: 2 },
      { type: "SINGLE", x: 0, y: 4 },
      { type: "SINGLE", x: 3, y: 4 },
    ],
  },
  {
    name: "四面楚歌",
    description: "四面受敌，需要找到突破口。此局难度：★★★★★",
    layout: [
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "CAO_CAO", x: 1, y: 1 },
      { type: "VERTICAL", x: 3, y: 0 },
      { type: "VERTICAL", x: 0, y: 3 },
      { type: "VERTICAL", x: 3, y: 2 },
      { type: "HORIZONTAL", x: 1, y: 3 },
      { type: "SINGLE", x: 0, y: 2 },
      { type: "SINGLE", x: 3, y: 4 },
      { type: "SINGLE", x: 1, y: 0 },
      { type: "SINGLE", x: 2, y: 0 },
    ],
  },
  {
    name: "兵分三路",
    description: "敌军分散，寻找突破时机。此局难度：★★★",
    layout: [
      { type: "VERTICAL", x: 0, y: 1 },
      { type: "CAO_CAO", x: 1, y: 0 },
      { type: "VERTICAL", x: 3, y: 1 },
      { type: "VERTICAL", x: 0, y: 3 }, 
      { type: "VERTICAL", x: 3, y: 3 },
      { type: "HORIZONTAL", x: 1, y: 2 },
      { type: "SINGLE", x: 0, y: 0 },
      { type: "SINGLE", x: 1, y: 3 },
      { type: "SINGLE", x: 2, y: 3 },
      { type: "SINGLE", x: 3, y: 0 },

    ],
  },
];

export default LEVELS;
