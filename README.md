![Caocao](public/CaocaoFailed.webp)

# Klotski: The Sliding Block Puzzle  


Klotski is a WEB sliding block puzzle that's popular throughout China. Its story is based on a well-known encounter during the **Eastern Han dynasty (25–220)** between **Cao Cao**, the shrewd and clever strategist for the Wei Kingdom, and **Guan Yu**, a commander in the Shu Kingdom army who had once served under Cao Cao.  

### **Gameplay**  
The goal is to move the largest block (2x2 block) to an exit with a two-grid side length below without taking it away from the board, while only sliding the blocks.

---
This project is a browser-based Klotski puzzle game, inspired by the classic Klotski by ZH Computer (1991, Windows 3.0). It features level-based leaderboards using Redis, tracks user moves, and allows players to compete for the lowest move count. The game is built with TypeScript, Redis, and a frontend UI, and was integrated into Reddit as a game post to attract players.

### **Historical Background**  
The game is named after the story of **Cao Cao's defeat on the Huarong Road** in *"Romance of the Three Kingdoms"* and **Guan Yunchang's righteous explanation of Cao Cao's release**.  


## Key Features

### Game Logic
- Grid-based movement system (4x5 grid)
- Block collision detection
- Move history tracking for undo functionality
- Local storage for score persistence

### Internationalization
- Language detection based on browser settings
- Dynamic text updates without page reload
- Parameterized translations
- Extensible translation system

### State Management
- Game state handled through TypeScript classes
- Move validation with collision detection
- History management for undo feature

### User Interface
- CSS Grid for game board layout
- CSS Variables for theming
- Responsive design
- Touch-friendly controls

### Type System
- Strict TypeScript typing
- Interface definitions for game entities
- Type safety for game state management

## Development

### Prerequisites
- Node.js 14+
- npm or yarn

### Setup
```bash
npm install   # Install dependencies
npm run dev   # Start development server
npm run build # Build for production
