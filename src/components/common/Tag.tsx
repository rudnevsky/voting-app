import React from 'react';

type TagProps = {
  children: React.ReactNode;
};

const Tag: React.FC<TagProps> = ({ children }) => (
  <span className="tag">{children}</span>
);

export default Tag;
