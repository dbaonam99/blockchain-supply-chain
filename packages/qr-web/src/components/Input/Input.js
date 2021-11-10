import React from 'react';
import styles from './Input.module.css';

function Input({ label, type, value, onChange }) {
  return (
    <div className={styles.inputWrapper}>
      <p className={styles.label}>{label}</p>
      <input
        type={type || 'text'}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
