[中文](README.md) | **English**

# React 2048 Game

A classic 2048 puzzle game built with React + TypeScript + Vite.

## 🎮 Game Introduction

2048 is a number puzzle game where players slide tiles to merge identical numbers, aiming to create a tile with the number 2048.

### Game Rules
- Use arrow keys or mouse swipe to move tiles
- When two tiles with the same number touch, they merge into one with double the value
- After each move, a new tile (2 or 4) appears randomly in an empty spot
- The game ends when no moves are possible
- Reach 2048 to win, but you can continue playing for higher scores

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **CSS3** - Styling and animations

## 📁 Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React Hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── styles/        # Style files
```

## 🎯 Features

- 📱 Responsive design for mobile and desktop
- 🎨 Smooth animations
- 💾 Local storage for high scores
- ⌨️ Keyboard and touch support
- 🔄 Undo functionality
- 🎵 Sound effects (optional)