import React from 'react';
import type { Grid as GridType } from '../types/game';
import { Tile } from './Tile';
import { GRID_SIZE } from '../utils/gameLogic';

interface GridProps {
  grid: GridType;
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
  const renderGridCells = () => {
    const cells = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        cells.push(
          <div 
            key={`cell-${row}-${col}`} 
            className="grid-cell"
          />
        );
      }
    }
    return cells;
  };

  const renderTiles = () => {
    const tiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const tile = grid[row][col];
        if (tile) {
          tiles.push(
            <Tile 
              key={tile.id} 
              tile={tile} 
            />
          );
        }
      }
    }
    return tiles;
  };

  return (
    <div className="grid-container">
      <div className="grid-background">
        {renderGridCells()}
      </div>
      <div className="grid-tiles">
        {renderTiles()}
      </div>
    </div>
  );
};