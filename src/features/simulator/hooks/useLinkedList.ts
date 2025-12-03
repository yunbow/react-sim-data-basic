import { useState, useCallback } from 'react';
import { LinkedListState, OperationLog } from '../types';

export const useLinkedList = (onLog: (log: OperationLog) => void) => {
  const [state, setState] = useState<LinkedListState>({
    nodes: {},
    head: null,
    highlightId: null,
  });

  const insertAt = useCallback(async (index: number, value: number, duration: number) => {
    const nodeIds = getNodeIds();
    if (index < 0 || index > nodeIds.length) {
      throw new Error('指定された位置は無効です');
    }

    const newId = `node-${Date.now()}`;

    setState(prev => ({
      ...prev,
      highlightId: newId,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    setState(prev => {
      const newNodes = { ...prev.nodes };
      const nodeIds = getNodeIds();

      if (index === 0) {
        newNodes[newId] = {
          id: newId,
          value,
          next: prev.head,
        };
        return {
          nodes: newNodes,
          head: newId,
          highlightId: null,
        };
      } else {
        const prevNodeId = nodeIds[index - 1];
        const nextNodeId = newNodes[prevNodeId].next;

        newNodes[newId] = {
          id: newId,
          value,
          next: nextNodeId,
        };
        newNodes[prevNodeId] = {
          ...newNodes[prevNodeId],
          next: newId,
        };

        return {
          nodes: newNodes,
          head: prev.head,
          highlightId: null,
        };
      }
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Insert',
      description: `Insert at index ${index}: ${value}`,
    });
  }, [onLog]);

  const removeAt = useCallback(async (index: number, duration: number) => {
    const nodeIds = getNodeIds();
    if (index < 0 || index >= nodeIds.length) {
      throw new Error('指定された位置は無効です');
    }

    const targetId = nodeIds[index];

    setState(prev => ({
      ...prev,
      highlightId: targetId,
    }));

    if (duration > 0) {
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const targetValue = state.nodes[targetId].value;

    setState(prev => {
      const newNodes = { ...prev.nodes };
      const nodeIds = getNodeIds();

      if (index === 0) {
        const newHead = newNodes[targetId].next;
        delete newNodes[targetId];
        return {
          nodes: newNodes,
          head: newHead,
          highlightId: null,
        };
      } else {
        const prevNodeId = nodeIds[index - 1];
        const nextNodeId = newNodes[targetId].next;

        newNodes[prevNodeId] = {
          ...newNodes[prevNodeId],
          next: nextNodeId,
        };
        delete newNodes[targetId];

        return {
          nodes: newNodes,
          head: prev.head,
          highlightId: null,
        };
      }
    });

    onLog({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      operation: 'Remove',
      description: `Remove at index ${index}: ${targetValue}`,
    });
  }, [state.nodes, onLog]);

  const getNodeIds = (): string[] => {
    const ids: string[] = [];
    let currentId = state.head;
    while (currentId !== null) {
      ids.push(currentId);
      currentId = state.nodes[currentId]?.next || null;
    }
    return ids;
  };

  const clear = useCallback(() => {
    setState({
      nodes: {},
      head: null,
      highlightId: null,
    });
  }, []);

  const initialize = useCallback((size: number) => {
    const nodes: Record<string, { id: string; value: number; next: string | null }> = {};
    let head: string | null = null;
    let prevId: string | null = null;

    for (let i = 0; i < size; i++) {
      const id = `node-${i}`;
      const value = Math.floor(Math.random() * 100);

      nodes[id] = {
        id,
        value,
        next: null,
      };

      if (i === 0) {
        head = id;
      } else if (prevId) {
        nodes[prevId].next = id;
      }

      prevId = id;
    }

    setState({
      nodes,
      head,
      highlightId: null,
    });
  }, []);

  return {
    state,
    insertAt,
    removeAt,
    clear,
    initialize,
  };
};
