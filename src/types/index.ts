export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  disabled?: boolean;
}

export interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  className?: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
  disabled?: boolean;
}

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export type DataStructureType = 'stack' | 'queue' | 'array' | 'linkedList' | 'hashTable' | 'set';

export type AnimationSpeed = 'step' | 'slow' | 'normal' | 'fast';

export interface OperationLog {
  id: string;
  timestamp: number;
  operation: string;
  description: string;
}

export interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  speed: AnimationSpeed;
}
