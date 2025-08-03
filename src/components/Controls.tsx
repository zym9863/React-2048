import React from 'react';
import type { Direction } from '../types/game';

interface ControlsProps {
  onMove: (direction: Direction) => void;
  onRestart: () => void;
  disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onMove, onRestart, disabled = false }) => {
  return (
    <div className="controls">
      <div className="instructions">
        <p>使用 <strong>WASD</strong> 键或<strong>方向键</strong>移动方块</p>
      </div>
      
      <div className="control-buttons">
        <button 
          className="restart-button"
          onClick={onRestart}
        >
          重新开始
        </button>
      </div>
      
      <div className="mobile-controls">
        <div className="direction-buttons">
          <button 
            className="direction-button up"
            onClick={() => onMove('up')}
            disabled={disabled}
            aria-label="向上移动"
          >
            ↑
          </button>
          <div className="middle-row">
            <button 
              className="direction-button left"
              onClick={() => onMove('left')}
              disabled={disabled}
              aria-label="向左移动"
            >
              ←
            </button>
            <button 
              className="direction-button right"
              onClick={() => onMove('right')}
              disabled={disabled}
              aria-label="向右移动"
            >
              →
            </button>
          </div>
          <button 
            className="direction-button down"
            onClick={() => onMove('down')}
            disabled={disabled}
            aria-label="向下移动"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};