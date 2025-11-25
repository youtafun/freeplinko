export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface PlinkoSettings {
  rows: number;
  risk: RiskLevel;
  betAmount: number;
}

export interface HistoryItem {
  id: string;
  multiplier: number;
  bet: number;
  payout: number;
  timestamp: number;
}

export interface Ball {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  restitution: number; // Bounciness
  active: boolean;
  value: number; // Bet amount attached to ball
}

export interface Peg {
  x: number;
  y: number;
  radius: number;
}