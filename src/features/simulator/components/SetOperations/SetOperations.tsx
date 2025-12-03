import { useState } from 'react';
import { Button, Input } from '../../../../components';
import styles from './SetOperations.module.css';

interface SetOperationsProps {
  onAdd: (value: number) => Promise<void>;
  onRemove: (value: number) => Promise<void>;
  onHas: (value: number) => Promise<void>;
}

export const SetOperations: React.FC<SetOperationsProps> = ({
  onAdd,
  onRemove,
  onHas,
}) => {
  const [addValue, setAddValue] = useState('');
  const [removeValue, setRemoveValue] = useState('');
  const [hasValue, setHasValue] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    const value = parseInt(addValue);
    if (isNaN(value)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onAdd(value);
      setAddValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRemove = async () => {
    const value = parseInt(removeValue);
    if (isNaN(value)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onRemove(value);
      setRemoveValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleHas = async () => {
    const value = parseInt(hasValue);
    if (isNaN(value)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onHas(value);
      setHasValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Set 操作</h3>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.operation}>
        <Input
          value={addValue}
          onChange={setAddValue}
          placeholder="値を入力"
          type="number"
        />
        <Button onClick={handleAdd}>
          Add
        </Button>
      </div>

      <div className={styles.operation}>
        <Input
          value={removeValue}
          onChange={setRemoveValue}
          placeholder="値を入力"
          type="number"
        />
        <Button onClick={handleRemove} variant="secondary">
          Remove
        </Button>
      </div>

      <div className={styles.operation}>
        <Input
          value={hasValue}
          onChange={setHasValue}
          placeholder="値を入力"
          type="number"
        />
        <Button onClick={handleHas} variant="outline">
          Has
        </Button>
      </div>
    </div>
  );
};
