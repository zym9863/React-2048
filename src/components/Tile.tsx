import React from 'react';
import type { Tile as TileType } from '../types/game';

interface TileProps {
  tile: TileType;
}

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      2: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      4: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      8: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      16: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      32: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      64: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      128: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      256: 'linear-gradient(135deg, #ff8a80 0%, #ffab91 100%)',
      512: 'linear-gradient(135deg, #81c784 0%, #aed581 100%)',
      1024: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
      2048: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)'
    };
    return colors[value] || 'linear-gradient(135deg, #333 0%, #555 100%)';
  };

  const getTextColor = (value: number): string => {
    return '#ffffff';
  };

  const getFontSize = (value: number): string => {
    if (value < 100) return '2rem';
    if (value < 1000) return '1.8rem';
    return '1.5rem';
  };

  return (
    <div 
      className={`tile tile-${tile.value} ${tile.isNew ? 'tile-new' : ''} ${tile.isMerged ? 'tile-merged' : ''}`}
      style={{
        '--tile-bg': getTileColor(tile.value),
        '--tile-color': getTextColor(tile.value),
        '--tile-font-size': getFontSize(tile.value),
        '--row': tile.row,
        '--col': tile.col
      } as React.CSSProperties & { [key: string]: any }}
    >
      {tile.value}
    </div>
  );
};