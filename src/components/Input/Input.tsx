import { InputProps } from '../../types';
import styles from './Input.module.css';

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  disabled = false,
}) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
