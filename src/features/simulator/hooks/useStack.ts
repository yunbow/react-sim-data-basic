import { useState, useCallback } from 'react';
import { StackState, OperationLog } from '../types';

export const useStack = (onLog: (log: OperationLog) => void) => {
  const [state, setState] = useState<StackState>({
    items: [],
    highlightIndex: null,
  });

  const push = useCallback(async (value: number, duration: number) => {
    setState(prev => ({
      ...prev,
      highlightIndex: prev.items.length,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => ({
      items: [...prev.items, value],
      highlightIndex: null,
    }));

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Push',
      description: `Push(${value})`,
    });
  }, [onLog]);

  const pop = useCallback(async (duration: number) => {
    if (state.items.length === 0) {
      throw new Error('操作できません:Stackが空です');
    }

    const topIndex = state.items.length - 1;
    setState(prev => ({
      ...prev,
      highlightIndex: topIndex,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const value = state.items[topIndex];
    setState(prev => ({
      items: prev.items.slice(0, -1),
      highlightIndex: null,
    }));

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Pop',
      description: `Pop() → ${value}`,
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
    push,
    pop,
    clear,
    initialize,
  };
};
