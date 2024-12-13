// <!-- 前六个关卡（横刀立马、指挥若定、将撞曹营、齐头并进、兵分三路、雨声淅沥） -->

interface Block {
  type: "VERTICAL" | "CAO_CAO" | "HORIZONTAL" | "SINGLE";
  x: number;
  y: number;
}

interface Level {
  name: string;
  layout: Block[];
}

const LEVELS: Level[] = [
  {
    name: "横刀立马",
    layout: [
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "CAO_CAO", x: 1, y: 0 },
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
    "name": "水泄不通",
    "layout": [
        { "type": "VERTICAL", "x": 0, "y": 0 },
        { "type": "CAO_CAO", "x": 1, "y": 0 },
        { "type": "SINGLE", "x": 3, "y": 0 },
        { "type": "SINGLE", "x": 3, "y": 1 },
        { "type": "HORIZONTAL", "x": 0, "y": 2 },
        { "type": "HORIZONTAL", "x": 0, "y": 3 },
        { "type": "HORIZONTAL", "x": 2, "y": 3 },
        { "type": "HORIZONTAL", "x": 2, "y": 2 },
        { "type": "SINGLE", "x": 0, "y": 4 },
        { "type": "SINGLE", "x": 3, "y": 4 },
    ]
},
{
  "name": "四面楚歌",
  "layout": [
      { "type": "VERTICAL", "x": 0, "y": 0 },
      { "type": "CAO_CAO", "x": 1, "y": 1 },
      { "type": "VERTICAL", "x": 3, "y": 0 },
      { "type": "VERTICAL", "x": 0, "y": 3 },
      { "type": "VERTICAL", "x": 3, "y": 2 },
      { "type": "HORIZONTAL", "x": 1, "y": 3 },
      { "type": "SINGLE", "x": 0, "y": 2 },
      { "type": "SINGLE", "x": 3, "y": 4 },
      { "type": "SINGLE", "x": 1, "y": 0 },
      { "type": "SINGLE", "x": 2, "y": 0 }
  ]
},
  {
    name: "兵分三路",
    layout: [
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "CAO_CAO", x: 1, y: 0 },
      { type: "VERTICAL", x: 3, y: 0 },
      { type: "HORIZONTAL", x: 0, y: 2 },
      { type: "HORIZONTAL", x: 2, y: 2 },
      { type: "SINGLE", x: 0, y: 3 },
      { type: "SINGLE", x: 1, y: 3 },
      { type: "SINGLE", x: 2, y: 3 },
      { type: "SINGLE", x: 3, y: 3 },
      { type: "SINGLE", x: 0, y: 4 },
      { type: "SINGLE", x: 3, y: 4 },
    ],
  },
  {
    name: "雨声淅沥",
    layout: [
      { type: "VERTICAL", x: 0, y: 0 },
      { type: "CAO_CAO", x: 1, y: 0 },
      { type: "VERTICAL", x: 3, y: 0 },
      { type: "HORIZONTAL", x: 0, y: 2 },
      { type: "HORIZONTAL", x: 2, y: 2 },
      { type: "SINGLE", x: 0, y: 3 },
      { type: "SINGLE", x: 1, y: 3 },
      { type: "SINGLE", x: 2, y: 3 },
      { type: "SINGLE", x: 3, y: 3 },
      { type: "SINGLE", x: 0, y: 4 },
      { type: "SINGLE", x: 3, y: 4 },
    ],
  },
];

export default LEVELS;
