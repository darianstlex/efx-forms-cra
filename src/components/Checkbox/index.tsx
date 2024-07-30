import React from 'react';
import type { InputHTMLAttributes } from 'react';

import styles from './index.module.scss';
import type { IFieldProps, IRFieldProps } from '../../forms';
import { Field } from '../../forms';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  name: string;
}

export const Checkbox = ({
  id,
  label,
  error,
  value,
  onChange,
  name,
  ...rest
}: InputProps & IFieldProps) => (
  <div className={styles.wrapper}>
    <div className={styles.field}>
      <label htmlFor={id || name} className={styles.label}>
        {label}
      </label>
      <input
        id={id || name}
        type="checkbox"
        className={styles.input}
        checked={value || false}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export const CheckboxField = ({
  name,
  ...rest
}: Omit<IRFieldProps, 'Field'> & InputProps) => (
  <Field name={name} Field={Checkbox} {...rest} />
);
