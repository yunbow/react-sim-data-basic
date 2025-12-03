import { SliderProps } from '../../types';
import styles from './Slider.module.css';

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          className={styles.slider}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};
