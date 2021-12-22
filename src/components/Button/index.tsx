import React, { ReactNode } from 'react';
import './index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  color?: 'primary' | 'secondary';
}

export const Button = ({ children, color = 'primary', type = 'button', ...props }: ButtonProps) => (
  <button className={`Button${color === 'primary' ? ' Button-primary' : ''}`} {...{ type, ...props }}>{children}</button>
);
