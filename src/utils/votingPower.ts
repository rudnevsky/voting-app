export function calculateVotingPower(builderScore: number, talentHoldings: number): number {
  return Math.floor(builderScore * Math.sqrt(talentHoldings));
} 