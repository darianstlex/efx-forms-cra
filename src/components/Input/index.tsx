import React from 'react';
import './index.css';

type TValue = string | number;
interface InputProps {
  label: string;
  error: string;
  errors: string[];
  value: TValue;
  onChange: (value: TValue) => void
}

export const Input = ({ label, error, errors, onChange, ...rest }: InputProps) => (
  <div className="Input-wrapper">
    <div className="Input-label">{label}</div>
    <input
      className="Input-field"
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
    {error && <span className="Input-error">{error}</span>}
  </div>
);
