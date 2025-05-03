import React from 'react';

type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, active, onChange }) => (
  <div className="tabs">
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

export default Tabs;
