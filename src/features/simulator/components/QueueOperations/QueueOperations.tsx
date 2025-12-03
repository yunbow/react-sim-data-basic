import { useState } from 'react';
import { Button, Input } from '../../../../components';
import styles from './QueueOperations.module.css';

interface QueueOperationsProps {
  onEnqueue: (value: number) => Promise<void>;
  onDequeue: () => Promise<void>;
}

export const QueueOperations: React.FC<QueueOperationsProps> = ({
  onEnqueue,
  onDequeue,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleEnqueue = async () => {
    const num = parseInt(value);
    if (isNaN(num)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onEnqueue(num);
      setValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDequeue = async () => {
    setError('');
    try {
      await onDequeue();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Queue 操作</h3>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.operation}>
        <Input
          value={value}
          onChange={setValue}
          placeholder="値を入力"
          type="number"
        />
        <Button onClick={handleEnqueue}>
          Enqueue
        </Button>
      </div>
      <div className={styles.operation}>
        <Button onClick={handleDequeue} variant="secondary">
          Dequeue
        </Button>
      </div>
    </div>
  );
};
