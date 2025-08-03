export type Tile = {
  id: string;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameState = 'playing' | 'won' | 'lost';

export type Grid = (Tile | null)[][];

export type GameData = {
  grid: Grid;
  score: number;
  bestScore: number;
  gameState: GameState;
  canMove: boolean;
};

export type MoveResult = {
  grid: Grid;
  score: number;
  moved: boolean;
  won: boolean;
};