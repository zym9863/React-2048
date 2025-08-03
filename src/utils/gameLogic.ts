import type { Grid, Tile, Direction, MoveResult } from '../types/game';

export const GRID_SIZE = 4;

export const createEmptyGrid = (): Grid => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getEmptyPositions = (grid: Grid): { row: number; col: number }[] => {
  const empty = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!grid[row][col]) {
        empty.push({ row, col });
      }
    }
  }
  return empty;
};

export const addRandomTile = (grid: Grid): Grid => {
  const emptyPositions = getEmptyPositions(grid);
  if (emptyPositions.length === 0) return grid;

  const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  
  const newGrid = grid.map(row => [...row]);
  newGrid[randomPosition.row][randomPosition.col] = {
    id: generateId(),
    value,
    row: randomPosition.row,
    col: randomPosition.col,
    isNew: true
  };
  
  return newGrid;
};

export const initializeGame = (): Grid => {
  let grid = createEmptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
};

const moveLeft = (grid: Grid): { newGrid: Grid; score: number; moved: boolean } => {
  const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  let score = 0;
  let moved = false;

  for (let row = 0; row < GRID_SIZE; row++) {
    const tiles = grid[row].filter(tile => tile !== null) as Tile[];
    let newCol = 0;
    
    for (let i = 0; i < tiles.length; i++) {
      const currentTile = tiles[i];
      
      if (i < tiles.length - 1 && currentTile.value === tiles[i + 1].value) {
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          row,
          col: newCol,
          isMerged: true
        };
        newGrid[row][newCol] = mergedTile;
        score += mergedTile.value;
        i++; // Skip next tile as it was merged
        moved = true;
      } else {
        const movedTile: Tile = {
          ...currentTile,
          row,
          col: newCol
        };
        newGrid[row][newCol] = movedTile;
        if (currentTile.col !== newCol) {
          moved = true;
        }
      }
      newCol++;
    }
  }

  return { newGrid, score, moved };
};

const moveRight = (grid: Grid): { newGrid: Grid; score: number; moved: boolean } => {
  const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  let score = 0;
  let moved = false;

  for (let row = 0; row < GRID_SIZE; row++) {
    const tiles = grid[row].filter(tile => tile !== null) as Tile[];
    let newCol = GRID_SIZE - 1;
    
    for (let i = tiles.length - 1; i >= 0; i--) {
      const currentTile = tiles[i];
      
      if (i > 0 && currentTile.value === tiles[i - 1].value) {
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          row,
          col: newCol,
          isMerged: true
        };
        newGrid[row][newCol] = mergedTile;
        score += mergedTile.value;
        i--; // Skip next tile as it was merged
        moved = true;
      } else {
        const movedTile: Tile = {
          ...currentTile,
          row,
          col: newCol
        };
        newGrid[row][newCol] = movedTile;
        if (currentTile.col !== newCol) {
          moved = true;
        }
      }
      newCol--;
    }
  }

  return { newGrid, score, moved };
};

const moveUp = (grid: Grid): { newGrid: Grid; score: number; moved: boolean } => {
  const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  let score = 0;
  let moved = false;

  for (let col = 0; col < GRID_SIZE; col++) {
    const tiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      if (grid[row][col]) {
        tiles.push(grid[row][col] as Tile);
      }
    }
    
    let newRow = 0;
    for (let i = 0; i < tiles.length; i++) {
      const currentTile = tiles[i];
      
      if (i < tiles.length - 1 && currentTile.value === tiles[i + 1].value) {
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          row: newRow,
          col,
          isMerged: true
        };
        newGrid[newRow][col] = mergedTile;
        score += mergedTile.value;
        i++; // Skip next tile as it was merged
        moved = true;
      } else {
        const movedTile: Tile = {
          ...currentTile,
          row: newRow,
          col
        };
        newGrid[newRow][col] = movedTile;
        if (currentTile.row !== newRow) {
          moved = true;
        }
      }
      newRow++;
    }
  }

  return { newGrid, score, moved };
};

const moveDown = (grid: Grid): { newGrid: Grid; score: number; moved: boolean } => {
  const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  let score = 0;
  let moved = false;

  for (let col = 0; col < GRID_SIZE; col++) {
    const tiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      if (grid[row][col]) {
        tiles.push(grid[row][col] as Tile);
      }
    }
    
    let newRow = GRID_SIZE - 1;
    for (let i = tiles.length - 1; i >= 0; i--) {
      const currentTile = tiles[i];
      
      if (i > 0 && currentTile.value === tiles[i - 1].value) {
        const mergedTile: Tile = {
          id: currentTile.id,
          value: currentTile.value * 2,
          row: newRow,
          col,
          isMerged: true
        };
        newGrid[newRow][col] = mergedTile;
        score += mergedTile.value;
        i--; // Skip next tile as it was merged
        moved = true;
      } else {
        const movedTile: Tile = {
          ...currentTile,
          row: newRow,
          col
        };
        newGrid[newRow][col] = movedTile;
        if (currentTile.row !== newRow) {
          moved = true;
        }
      }
      newRow--;
    }
  }

  return { newGrid, score, moved };
};

export const move = (grid: Grid, direction: Direction): MoveResult => {
  let result;
  
  switch (direction) {
    case 'left':
      result = moveLeft(grid);
      break;
    case 'right':
      result = moveRight(grid);
      break;
    case 'up':
      result = moveUp(grid);
      break;
    case 'down':
      result = moveDown(grid);
      break;
    default:
      return { grid, score: 0, moved: false, won: false };
  }

  const { newGrid, score, moved } = result;
  
  // Check for 2048
  const won = newGrid.some(row => 
    row.some(tile => tile && tile.value === 2048)
  );

  return {
    grid: newGrid,
    score,
    moved,
    won
  };
};

export const canMove = (grid: Grid): boolean => {
  // Check for empty cells
  if (getEmptyPositions(grid).length > 0) {
    return true;
  }

  // Check for possible merges
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const current = grid[row][col];
      if (!current) continue;

      // Check adjacent cells
      const adjacent = [
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 }
      ];

      for (const { row: adjRow, col: adjCol } of adjacent) {
        if (adjRow >= 0 && adjRow < GRID_SIZE && adjCol >= 0 && adjCol < GRID_SIZE) {
          const adjacent = grid[adjRow][adjCol];
          if (adjacent && adjacent.value === current.value) {
            return true;
          }
        }
      }
    }
  }

  return false;
};