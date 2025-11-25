import { RiskLevel } from './types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const MULTIPLIERS = {
  [RiskLevel.LOW]: {
    8: [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
    12: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
    16: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16],
  },
  [RiskLevel.MEDIUM]: {
    8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
    12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
    16: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110],
  },
  [RiskLevel.HIGH]: {
    8: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
    12: [170, 51, 14, 4, 1.7, 0.5, 0.2, 0.5, 1.7, 4, 14, 51, 170],
    16: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000],
  }
};

export const COLOR_MULTIPLIER_BG = {
  low: 'bg-amber-400',
  medium: 'bg-orange-500',
  high: 'bg-red-600',
};

export const GRAVITY = 0.25;
export const FRICTION = 0.99;
export const PEG_RADIUS = 4;
export const BALL_RADIUS = 7;