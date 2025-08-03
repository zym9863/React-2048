import React, { useEffect, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { Grid } from './Grid';
import { GameStatus } from './GameStatus';
import { Controls } from './Controls';
import type { Direction } from '../types/game';

export const Game: React.FC = () => {
  const {
    grid,
    score,
    bestScore,
    gameState,
    makeMove,
    resetGame,
    continueGame,
    isAnimating
  } = useGame();

  const gameRef = useRef<HTMLDivElement>(null);

  // Touch controls for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      endX = touch.clientX;
      endY = touch.clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          makeMove('right');
        } else {
          makeMove('left');
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          makeMove('down');
        } else {
          makeMove('up');
        }
      }
    };

    const gameElement = gameRef.current;
    if (gameElement) {
      gameElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      gameElement.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        gameElement.removeEventListener('touchstart', handleTouchStart);
        gameElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [makeMove]);

  const handleMove = (direction: Direction) => {
    if (gameState !== 'lost' && !isAnimating) {
      makeMove(direction);
    }
  };

  return (
    <div className="game" ref={gameRef}>
      <div className="game-header">
        <h1>2048</h1>
        <p className="game-description">
          合并数字，争取达到 <strong>2048</strong>!
        </p>
      </div>

      <GameStatus
        score={score}
        bestScore={bestScore}
        gameState={gameState}
        onRestart={resetGame}
        onContinue={continueGame}
      />

      <div className="game-board">
        <Grid grid={grid} />
      </div>

      <Controls
        onMove={handleMove}
        onRestart={resetGame}
        disabled={gameState === 'lost' || isAnimating}
      />

      <div className="game-explanation">
        <p>
          <strong>如何游戏：</strong> 使用方向键移动方块。当两个相同数字的方块碰撞时，它们会合并成一个！
        </p>
      </div>
    </div>
  );
};