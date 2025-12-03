import { useState } from 'react';
import { Button, Input } from '../../../../components';
import styles from './StackOperations.module.css';

interface StackOperationsProps {
  onPush: (value: number) => Promise<void>;
  onPop: () => Promise<void>;
}

export const StackOperations: React.FC<StackOperationsProps> = ({
  onPush,
  onPop,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handlePush = async () => {
    const num = parseInt(value);
    if (isNaN(num)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onPush(num);
      setValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handlePop = async () => {
    setError('');
    try {
      await onPop();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Stack 操作</h3>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.operation}>
        <Input
          value={value}
          onChange={setValue}
          placeholder="値を入力"
          type="number"
        />
        <Button onClick={handlePush}>
          Push
        </Button>
      </div>
      <div className={styles.operation}>
        <Button onClick={handlePop} variant="secondary">
          Pop
        </Button>
      </div>
    </div>
  );
};
