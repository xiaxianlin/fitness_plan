import './index.css';
import React from 'react';

interface BlockBoxProps {
  title: string;
  children?: React.ReactNode;
}

export const BlockBox: React.FC<BlockBoxProps> = ({ title, children }) => {
  return (
    <div className="block-box">
      <div className="block-box-head">{title}</div>
      <div className="block-box-body">{children}</div>
    </div>
  );
};
