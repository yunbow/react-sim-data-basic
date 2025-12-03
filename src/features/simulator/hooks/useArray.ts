import { useState, useCallback } from 'react';
import { ArrayState, OperationLog } from '../types';

export const useArray = (onLog: (log: OperationLog) => void) => {
  const [state, setState] = useState<ArrayState>({
    items: [],
    highlightIndex: null,
  });

  const insertAt = useCallback(async (index: number, value: number, duration: number) => {
    if (index < 0 || index > state.items.length) {
      throw new Error('指定された位置は無効です');
    }

    setState(prev => ({
      ...prev,
      highlightIndex: index,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 0, value);
      return {
        items: newItems,
        highlightIndex: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Insert',
      description: `Insert at index ${index}: ${value}`,
    });
  }, [state.items.length, onLog]);

  const removeAt = useCallback(async (index: number, duration: number) => {
    if (index < 0 || index >= state.items.length) {
      throw new Error('指定された位置は無効です');
    }

    setState(prev => ({
      ...prev,
      highlightIndex: index,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const value = state.items[index];
    setState(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return {
        items: newItems,
        highlightIndex: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Remove',
      description: `Remove at index ${index}: ${value}`,
    });
  }, [state.items, onLog]);

  const updateAt = useCallback(async (index: number, value: number, duration: number) => {
    if (index < 0 || index >= state.items.length) {
      throw new Error('指定された位置は無効です');
    }

    setState(prev => ({
      ...prev,
      highlightIndex: index,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const oldValue = state.items[index];
    setState(prev => {
      const newItems = [...prev.items];
      newItems[index] = value;
      return {
        items: newItems,
        highlightIndex: null,
      };
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Update',
      description: `Update at index ${index}: ${oldValue} → ${value}`,
    });
  }, [state.items, onLog]);

  const clear = useCallback(() => {
    setState({
      items: [],
      highlightIndex: null,
    });
  }, []);

  const initialize = useCallback((size: number) => {
    const items = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setState({
      items,
      highlightIndex: null,
    });
  }, []);

  return {
    state,
    insertAt,
    removeAt,
    updateAt,
    clear,
    initialize,
  };
};
