import React, { ReactNode } from 'react';

import styles from './index.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  secondary?: boolean;
}

export const Button = ({
  children,
  secondary = false,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={[styles.button, secondary ? styles.secondary : ''].join(' ')}
    {...{ type, ...props }}
  >
    {children}
  </button>
);
