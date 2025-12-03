import { SelectProps } from '../../types';
import styles from './Select.module.css';

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = '',
  disabled = false,
}) => {
  return (
    <select
      className={`${styles.select} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
