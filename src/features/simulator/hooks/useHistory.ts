import { useState, useCallback } from 'react';
import { HistoryState, DataStructureState, OperationLog } from '../types';

const MAX_HISTORY_SIZE = 50;

export const useHistory = (initialState: DataStructureState) => {
  const [history, setHistory] = useState<HistoryState[]>([
    { dataStructure: initialState, logs: [] }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToHistory = useCallback((
    newState: DataStructureState,
    log: OperationLog
  ) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      const lastState = newHistory[newHistory.length - 1];
      const newLogs = [...lastState.logs, log];

      const newItem = {
        dataStructure: newState,
        logs: newLogs.slice(-MAX_HISTORY_SIZE)
      };

      const updatedHistory = [...newHistory, newItem];

      if (updatedHistory.length > MAX_HISTORY_SIZE) {
        return updatedHistory.slice(-MAX_HISTORY_SIZE);
      }

      return updatedHistory;
    });

    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      return newIndex >= MAX_HISTORY_SIZE ? MAX_HISTORY_SIZE - 1 : newIndex;
    });
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, history.length]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const currentState = history[currentIndex];

  return {
    currentState,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
