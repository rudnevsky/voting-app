import React from 'react';

type VotingPowerBreakdownProps = {
  builderScore: number;
  talentHoldings: number;
  totalVotingPower: number;
  availableVotes: number;
  lockedVotes: number;
};

const VotingPowerBreakdown: React.FC<VotingPowerBreakdownProps> = ({ builderScore, talentHoldings, totalVotingPower, availableVotes, lockedVotes }) => (
  <div className="voting-power-breakdown">
    <div>Builder Score: {builderScore}</div>
    <div>$TALENT Holdings: {talentHoldings}</div>
    <div>Total Voting Power: {totalVotingPower}</div>
    <div>Available: {availableVotes} | Locked: {lockedVotes}</div>
    <div>Formula: Builder Score × sqrt($TALENT Holdings)</div>
  </div>
);

export default VotingPowerBreakdown;
