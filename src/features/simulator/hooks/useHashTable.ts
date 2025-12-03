import { useState, useCallback } from 'react';
import { HashTableState, OperationLog } from '../types';

const BUCKET_SIZE = 8;

export const useHashTable = (onLog: (log: OperationLog) => void) => {
  const [state, setState] = useState<HashTableState>({
    buckets: Array.from({ length: BUCKET_SIZE }, () => []),
    size: 0,
    highlightIndex: null,
  });

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % BUCKET_SIZE;
  };

  const set = useCallback(async (key: string, value: number, duration: number) => {
    const index = hashFunction(key);

    setState(prev => ({
      ...prev,
      highlightIndex: index,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => {
      const newBuckets = prev.buckets.map(bucket => [...bucket]);
      const bucket = newBuckets[index];

      const existingIndex = bucket.findIndex(item => item.key === key);
      if (existingIndex !== -1) {
        bucket[existingIndex] = { key, value };
      } else {
        bucket.push({ key, value });
      }

      return {
        buckets: newBuckets,
        size: prev.size + (existingIndex === -1 ? 1 : 0),
        highlightIndex: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Set',
      description: `Set("${key}", ${value})`,
    });
  }, [onLog]);

  const remove = useCallback(async (key: string, duration: number) => {
    const index = hashFunction(key);
    const bucket = state.buckets[index];
    const existingIndex = bucket.findIndex(item => item.key === key);

    if (existingIndex === -1) {
      throw new Error('指定されたキーが見つかりません');
    }

    setState(prev => ({
      ...prev,
      highlightIndex: index,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const removedValue = bucket[existingIndex].value;

    setState(prev => {
      const newBuckets = prev.buckets.map(bucket => [...bucket]);
      newBuckets[index].splice(existingIndex, 1);

      return {
        buckets: newBuckets,
        size: prev.size - 1,
        highlightIndex: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Remove',
      description: `Remove("${key}") → ${removedValue}`,
    });
  }, [state.buckets, onLog]);

  const get = useCallback(async (key: string, duration: number) => {
    const index = hashFunction(key);
    const bucket = state.buckets[index];
    const item = bucket.find(item => item.key === key);

    setState(prev => ({
      ...prev,
      highlightIndex: index,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => ({
      ...prev,
      highlightIndex: null,
    }));

    if (!item) {
      throw new Error('指定されたキーが見つかりません');
    }

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Get',
      description: `Get("${key}") → ${item.value}`,
    });
  }, [state.buckets, onLog]);

  const clear = useCallback(() => {
    setState({
      buckets: Array.from({ length: BUCKET_SIZE }, () => []),
      size: 0,
      highlightIndex: null,
    });
  }, []);

  const initialize = useCallback((size: number) => {
    const buckets: Array<Array<{ key: string; value: number }>> = Array.from({ length: BUCKET_SIZE }, () => []);

    for (let i = 0; i < size; i++) {
      const key = `key${i}`;
      const value = Math.floor(Math.random() * 100);
      const index = hashFunction(key);
      buckets[index].push({ key, value });
    }

    setState({
      buckets,
      size,
      highlightIndex: null,
    });
  }, []);

  return {
    state,
    set,
    remove,
    get,
    clear,
    initialize,
  };
};
