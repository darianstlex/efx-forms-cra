import React, {InputHTMLAttributes} from 'react';

import styles from './index.module.scss';
import { Field, IFieldProps, IRFieldProps } from "../../forms";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  name: string;
}

export const Input = ({
  id,
  label,
  error,
  onChange,
  name,
  value,
  ...rest
}: InputProps & IFieldProps) => (
  <div className={styles.wrapper}>
    <label htmlFor={id || name}>{label}</label>
    <input
      name={name}
      id={id || name}
      className={styles.input}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
      {...rest}
    />
    {error && (
      <span data-test={`${name}-error`} className={styles.error}>
        {error}
      </span>
    )}
  </div>
);

export const TextField = ({
  name,
  ...rest
}: Omit<IRFieldProps, 'Field'> & InputProps) => (
  <Field name={name} Field={Input} {...rest} />
);

export const NumberField = ({
  name,
  ...rest
}: Omit<IRFieldProps, 'Field'> & InputProps) => (
  <Field
    name={name}
    Field={Input}
    type="number"
    format={(num: number) => `${num}`}
    parse={(num: number) => Number(num)}
    {...rest}
  />
);

