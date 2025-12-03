import { useState } from 'react';
import { Button, Input } from '../../../../components';
import styles from './ArrayOperations.module.css';

interface ArrayOperationsProps {
  onInsertAt: (index: number, value: number) => Promise<void>;
  onRemoveAt: (index: number) => Promise<void>;
  onUpdateAt: (index: number, value: number) => Promise<void>;
}

export const ArrayOperations: React.FC<ArrayOperationsProps> = ({
  onInsertAt,
  onRemoveAt,
  onUpdateAt,
}) => {
  const [insertIndex, setInsertIndex] = useState('');
  const [insertValue, setInsertValue] = useState('');
  const [removeIndex, setRemoveIndex] = useState('');
  const [updateIndex, setUpdateIndex] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [error, setError] = useState('');

  const handleInsert = async () => {
    const index = parseInt(insertIndex);
    const value = parseInt(insertValue);
    if (isNaN(index) || isNaN(value)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onInsertAt(index, value);
      setInsertIndex('');
      setInsertValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRemove = async () => {
    const index = parseInt(removeIndex);
    if (isNaN(index)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onRemoveAt(index);
      setRemoveIndex('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdate = async () => {
    const index = parseInt(updateIndex);
    const value = parseInt(updateValue);
    if (isNaN(index) || isNaN(value)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onUpdateAt(index, value);
      setUpdateIndex('');
      setUpdateValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Array 操作</h3>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.operation}>
        <Input
          value={insertIndex}
          onChange={setInsertIndex}
          placeholder="Index"
          type="number"
        />
        <Input
          value={insertValue}
          onChange={setInsertValue}
          placeholder="Value"
          type="number"
        />
        <Button onClick={handleInsert}>
          Insert
        </Button>
      </div>

      <div className={styles.operation}>
        <Input
          value={removeIndex}
          onChange={setRemoveIndex}
          placeholder="Index"
          type="number"
        />
        <Button onClick={handleRemove} variant="secondary">
          Remove
        </Button>
      </div>

      <div className={styles.operation}>
        <Input
          value={updateIndex}
          onChange={setUpdateIndex}
          placeholder="Index"
          type="number"
        />
        <Input
          value={updateValue}
          onChange={setUpdateValue}
          placeholder="Value"
          type="number"
        />
        <Button onClick={handleUpdate} variant="outline">
          Update
        </Button>
      </div>
    </div>
  );
};
