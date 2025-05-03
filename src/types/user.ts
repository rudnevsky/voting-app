import { DataPoint as DP } from './dataPoint';
export type DataPoint = DP;

export interface User {
  id: string;
  builderScore: number;
  talentHoldings: number;
}

export interface UserContextType {
  user: User;
  dataPoints: DataPoint[];
  voteForDataPoint: (dataPointId: string, votes: number) => void;
  redeemVotes: (dataPointId: string, newValue: number) => void;
  totalVotingPower: number;
  available: number;
  locked: number;
} 