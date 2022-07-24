import { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...rest }: Props) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="input">
        {label}
      </label>
      <input {...rest} />
    </div>
  )
}