import { useState, useCallback } from 'react';
import { SetState, OperationLog } from '../types';

export const useSet = (onLog: (log: OperationLog) => void) => {
  const [state, setState] = useState<SetState>({
    items: new Set<number>(),
    highlightItem: null,
  });

  const add = useCallback(async (value: number, duration: number) => {
    if (state.items.has(value)) {
      throw new Error('既に存在する値です');
    }

    setState(prev => ({
      ...prev,
      highlightItem: value,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => {
      const newItems = new Set(prev.items);
      newItems.add(value);
      return {
        items: newItems,
        highlightItem: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Add',
      description: `Add(${value})`,
    });
  }, [state.items, onLog]);

  const remove = useCallback(async (value: number, duration: number) => {
    if (!state.items.has(value)) {
      throw new Error('指定された値が見つかりません');
    }

    setState(prev => ({
      ...prev,
      highlightItem: value,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => {
      const newItems = new Set(prev.items);
      newItems.delete(value);
      return {
        items: newItems,
        highlightItem: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Remove',
      description: `Remove(${value})`,
    });
  }, [state.items, onLog]);

  const has = useCallback(async (value: number, duration: number) => {
    setState(prev => ({
      ...prev,
      highlightItem: value,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const exists = state.items.has(value);

    setState(prev => ({
      ...prev,
      highlightItem: null,
    }));

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Has',
      description: `Has(${value}) → ${exists}`,
    });
  }, [state.items, onLog]);

  const clear = useCallback(() => {
    setState({
      items: new Set<number>(),
      highlightItem: null,
    });
  }, []);

  const initialize = useCallback((size: number) => {
    const items = new Set<number>();
    while (items.size < size) {
      items.add(Math.floor(Math.random() * 100));
    }
    setState({
      items,
      highlightItem: null,
    });
  }, []);

  return {
    state,
    add,
    remove,
    has,
    clear,
    initialize,
  };
};
