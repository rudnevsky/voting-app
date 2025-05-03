import React, { createContext, useContext, useState } from 'react';
import { User, DataPoint, UserContextType } from '../types/user';

const initialUser: User = {
  id: 'user1',
  builderScore: 100,
  talentHoldings: 2000,
};

const initialDataPoints: DataPoint[] = [
  {
    id: '1',
    name: 'BUILD Contribution',
    issuer: 'BUILD',
    points: 10,
    description: 'Checks the amount of $BUILD tokens committed.',
    totalVotes: 0,
    status: 'voting',
    userVotes: 0,
  },
  {
    id: '2',
    name: 'Github Stars',
    issuer: 'Github',
    points: 6,
    description: 'Verifies the number of repository stars.',
    totalVotes: 0,
    status: 'voting',
    userVotes: 0,
  },
  {
    id: '3',
    name: 'Twitter Followers',
    issuer: 'Twitter',
    points: 4,
    description: 'Counts the number of Twitter followers.',
    totalVotes: 0,
    status: 'to-launch',
    userVotes: 0,
  },
  {
    id: '4',
    name: 'ENS Holder',
    issuer: 'ENS',
    points: 2,
    description: 'Checks if the user owns an ENS domain.',
    totalVotes: 0,
    status: 'launched',
    userVotes: 0,
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<User>(initialUser);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(initialDataPoints);

  // Calculate total voting power (for now, sum)
  const totalVotingPower = user.builderScore + user.talentHoldings;
  const locked = dataPoints.reduce((sum, dp) => sum + (dp.userVotes || 0), 0);
  const available = totalVotingPower - locked;

  // Voting logic
  const voteForDataPoint = (dataPointId: string, votes: number) => {
    setDataPoints(prev => prev.map(dp => {
      if (dp.id === dataPointId) {
        const prevUserVotes = dp.userVotes || 0;
        const diff = votes - prevUserVotes;
        return {
          ...dp,
          userVotes: votes,
          totalVotes: (dp.totalVotes || 0) + diff,
        };
      }
      return dp;
    }));
  };

  // Partial redeem logic
  const redeemVotes = (dataPointId: string, newValue: number) => {
    setDataPoints(prev => prev.map(d => {
      if (d.id === dataPointId) {
        const prevUserVotes = d.userVotes || 0;
        const diff = prevUserVotes - newValue;
        return {
          ...d,
          userVotes: newValue,
          totalVotes: (d.totalVotes || 0) - diff,
        };
      }
      return d;
    }));
  };

  return (
    <UserContext.Provider value={{ user, dataPoints, voteForDataPoint, redeemVotes, totalVotingPower, available, locked }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}; 