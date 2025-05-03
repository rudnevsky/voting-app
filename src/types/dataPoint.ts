export interface DataPoint {
  id: string;
  name: string;
  description: string;
  issuer: string;
  points: number;
  totalVotes: number;
  userVotes?: number;
  status: 'voting' | 'to-launch' | 'launched';
  available?: number;
  locked?: number;
} 