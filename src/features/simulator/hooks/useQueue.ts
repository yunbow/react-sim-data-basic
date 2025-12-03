import { useState, useCallback } from 'react';
import { QueueState, OperationLog } from '../types';

export const useQueue = (onLog: (log: OperationLog) => void) => {
  const [state, setState] = useState<QueueState>({
    items: [],
    front: 0,
    rear: 0,
    highlightIndex: null,
  });

  const enqueue = useCallback(async (value: number, duration: number) => {
    setState(prev => ({
      ...prev,
      highlightIndex: prev.rear,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => ({
      items: [...prev.items, value],
      front: prev.front,
      rear: prev.rear + 1,
      highlightIndex: null,
    }));

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Enqueue',
      description: `Enqueue(${value})`,
    });
  }, [onLog]);

  const dequeue = useCallback(async (duration: number) => {
    if (state.items.length === 0) {
      throw new Error('操作できません:Queueが空です');
    }

    setState(prev => ({
      ...prev,
      highlightIndex: prev.front,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const value = state.items[0];
    setState(prev => ({
      items: prev.items.slice(1),
      front: prev.front,
      rear: prev.rear - 1,
      highlightIndex: null,
    }));

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Dequeue',
      description: `Dequeue() → ${value}`,
    });
  }, [state.items, onLog]);

  const clear = useCallback(() => {
    setState({
      items: [],
      front: 0,
      rear: 0,
      highlightIndex: null,
    });
  }, []);

  const initialize = useCallback((size: number) => {
    const items = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setState({
      items,
      front: 0,
      rear: items.length,
      highlightIndex: null,
    });
  }, []);

  return {
    state,
    enqueue,
    dequeue,
    clear,
    initialize,
  };
};
