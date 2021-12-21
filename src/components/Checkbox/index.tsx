import React from 'react';
import './index.css';

type TValue = boolean;
interface CheckboxProps {
  label: string;
  error: string;
  errors: string[];
  value: TValue;
  onChange: (checked: TValue) => void
}

export const Checkbox = ({ label, error, errors, value, onChange, ...rest }: CheckboxProps) => (
  <div className="Checkbox-wrapper">
    <div className="Checkbox-field">
      <div className="Checkbox-label">{label}</div>
      <input
        type="checkbox"
        className="Checkbox-input"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
    </div>
    {error && <span className="Checkbox-error">{error}</span>}
  </div>
);
