import React from 'react';
import type { GameState } from '../types/game';

interface GameStatusProps {
  score: number;
  bestScore: number;
  gameState: GameState;
  onRestart: () => void;
  onContinue?: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ 
  score, 
  bestScore, 
  gameState, 
  onRestart,
  onContinue 
}) => {
  return (
    <div className="game-status">
      <div className="scores">
        <div className="score-container">
          <div className="score-label">分数</div>
          <div className="score-value">{score}</div>
        </div>
        <div className="score-container">
          <div className="score-label">最佳</div>
          <div className="score-value">{bestScore}</div>
        </div>
      </div>
      
      {gameState === 'won' && (
        <div className="game-message game-won">
          <h2>你赢了！</h2>
          <p>恭喜达到2048！</p>
          <div className="game-message-buttons">
            <button onClick={onContinue} className="continue-button">
              继续游戏
            </button>
            <button onClick={onRestart} className="restart-button">
              重新开始
            </button>
          </div>
        </div>
      )}
      
      {gameState === 'lost' && (
        <div className="game-message game-over">
          <h2>游戏结束</h2>
          <p>没有可移动的方块了</p>
          <div className="game-message-buttons">
            <button onClick={onRestart} className="restart-button">
              重新开始
            </button>
          </div>
        </div>
      )}
    </div>
  );
};