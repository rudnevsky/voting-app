import React from 'react';

type VoteTabsProps = {
  active: string;
  onChange: (value: string) => void;
};

const tabs = [
  { label: 'Voting', value: 'voting' },
  { label: 'To launch', value: 'to-launch' },
  { label: 'Launched', value: 'launched' },
];

const VoteTabs: React.FC<VoteTabsProps> = ({ active, onChange }) => (
  <div className="vote-tabs">
    {tabs.map(tab => (
      <button
        key={tab.value}
        className={tab.value === active ? 'active' : ''}
        onClick={() => onChange(tab.value)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default VoteTabs;
