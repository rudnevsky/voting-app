import React from 'react';

type SliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ min, max, value, onChange }) => (
  <input
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={e => onChange(Number(e.target.value))}
  />
);

export default Slider;
