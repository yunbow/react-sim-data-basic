export type DataStructureType = 'stack' | 'queue' | 'array' | 'linkedList' | 'hashTable' | 'set';

export type AnimationSpeed = 'step' | 'slow' | 'normal' | 'fast';

export interface OperationLog {
  id: string;
  timestamp: number;
  operation: string;
  description: string;
}

export interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  speed: AnimationSpeed;
  currentStep: number;
}

export interface StackState {
  items: number[];
  highlightIndex: number | null;
}

export interface QueueState {
  items: number[];
  front: number;
  rear: number;
  highlightIndex: number | null;
}

export interface ArrayState {
  items: number[];
  highlightIndex: number | null;
}

export interface LinkedListNode {
  value: number;
  next: string | null;
  id: string;
}

export interface LinkedListState {
  nodes: Record<string, LinkedListNode>;
  head: string | null;
  highlightId: string | null;
}

export interface HashTableState {
  buckets: Array<Array<{ key: string; value: number }>>;
  size: number;
  highlightIndex: number | null;
}

export interface SetState {
  items: Set<number>;
  highlightItem: number | null;
}

export type DataStructureState =
  | { type: 'stack'; data: StackState }
  | { type: 'queue'; data: QueueState }
  | { type: 'array'; data: ArrayState }
  | { type: 'linkedList'; data: LinkedListState }
  | { type: 'hashTable'; data: HashTableState }
  | { type: 'set'; data: SetState };

export interface HistoryState {
  dataStructure: DataStructureState;
  logs: OperationLog[];
}
