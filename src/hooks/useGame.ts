import { useState, useCallback, useEffect } from 'react';
import type { Grid, Direction, GameState, GameData } from '../types/game';
import { initializeGame, move, addRandomTile, canMove } from '../utils/gameLogic';

const BEST_SCORE_KEY = 'best-score-2048';

export const useGame = () => {
  const [grid, setGrid] = useState<Grid>(() => initializeGame());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isAnimating, setIsAnimating] = useState(false);

  // Update best score when score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem(BEST_SCORE_KEY, score.toString());
    }
  }, [score, bestScore]);

  // Check game state after each move
  useEffect(() => {
    if (gameState === 'playing') {
      const hasWon = grid.some(row => 
        row.some(tile => tile && tile.value === 2048)
      );
      
      if (hasWon) {
        setGameState('won');
      } else if (!canMove(grid)) {
        setGameState('lost');
      }
    }
  }, [grid, gameState]);

  const makeMove = useCallback((direction: Direction) => {
    if (gameState === 'lost' || isAnimating) return;

    setIsAnimating(true);
    
    const result = move(grid, direction);
    
    if (result.moved) {
      // Clear animation flags
      const cleanGrid = result.grid.map(row =>
        row.map(tile => 
          tile ? ({ ...tile, isNew: false, isMerged: false }) : null
        )
      );
      
      setGrid(cleanGrid);
      setScore(prev => prev + result.score);

      // Add new tile after a short delay
      setTimeout(() => {
        const newGrid = addRandomTile(cleanGrid);
        setGrid(newGrid);
        setIsAnimating(false);
      }, 150);
    } else {
      setIsAnimating(false);
    }
  }, [grid, gameState, isAnimating]);

  const resetGame = useCallback(() => {
    const newGrid = initializeGame();
    setGrid(newGrid);
    setScore(0);
    setGameState('playing');
    setIsAnimating(false);
  }, []);

  const continueGame = useCallback(() => {
    if (gameState === 'won') {
      setGameState('playing');
    }
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState === 'lost') return;

      const keyMap: { [key: string]: Direction } = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        'W': 'up',
        's': 'down',
        'S': 'down',
        'a': 'left',
        'A': 'left',
        'd': 'right',
        'D': 'right'
      };

      const direction = keyMap[event.key];
      if (direction) {
        event.preventDefault();
        makeMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [makeMove, gameState]);

  const gameData: GameData = {
    grid,
    score,
    bestScore,
    gameState,
    canMove: canMove(grid)
  };

  return {
    ...gameData,
    makeMove,
    resetGame,
    continueGame,
    isAnimating
  };
};