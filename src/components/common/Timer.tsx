import React from 'react';

type TimerProps = {
  seconds: number;
};

const Timer: React.FC<TimerProps> = ({ seconds }) => {
  // For now, just display seconds
  return <span>{seconds}s</span>;
};

export default Timer;
