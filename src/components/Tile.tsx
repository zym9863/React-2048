import React from 'react';
import type { Tile as TileType } from '../types/game';

interface TileProps {
  tile: TileType;
}

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e'
    };
    return colors[value] || '#3c3a32';
  };

  const getTextColor = (value: number): string => {
    return value <= 4 ? '#776e65' : '#f9f6f2';
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