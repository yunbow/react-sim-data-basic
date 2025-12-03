import { useState } from 'react';
import { Button, Input } from '../../../../components';
import styles from './HashTableOperations.module.css';

interface HashTableOperationsProps {
  onSet: (key: string, value: number) => Promise<void>;
  onRemove: (key: string) => Promise<void>;
  onGet: (key: string) => Promise<void>;
}

export const HashTableOperations: React.FC<HashTableOperationsProps> = ({
  onSet,
  onRemove,
  onGet,
}) => {
  const [setKey, setSetKey] = useState('');
  const [setValue, setSetValue] = useState('');
  const [removeKey, setRemoveKey] = useState('');
  const [getKey, setGetKey] = useState('');
  const [error, setError] = useState('');

  const handleSet = async () => {
    const value = parseInt(setValue);
    if (!setKey || isNaN(value)) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onSet(setKey, value);
      setSetKey('');
      setSetValue('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRemove = async () => {
    if (!removeKey) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onRemove(removeKey);
      setRemoveKey('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGet = async () => {
    if (!getKey) {
      setError('入力形式が正しくありません');
      return;
    }
    setError('');
    try {
      await onGet(getKey);
      setGetKey('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Hash Table 操作</h3>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.operation}>
        <Input
          value={setKey}
          onChange={setSetKey}
          placeholder="Key"
          type="text"
        />
        <Input
          value={setValue}
          onChange={setSetValue}
          placeholder="Value"
          type="number"
        />
        <Button onClick={handleSet}>
          Set
        </Button>
      </div>

      <div className={styles.operation}>
        <Input
          value={removeKey}
          onChange={setRemoveKey}
          placeholder="Key"
          type="text"
        />
        <Button onClick={handleRemove} variant="secondary">
          Remove
        </Button>
      </div>

      <div className={styles.operation}>
        <Input
          value={getKey}
          onChange={setGetKey}
          placeholder="Key"
          type="text"
        />
        <Button onClick={handleGet} variant="outline">
          Get
        </Button>
      </div>
    </div>
  );
};
