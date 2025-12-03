import { useState, useCallback, useEffect } from 'react';
import { DataStructureType, OperationLog } from './types';
import { useStack } from './hooks/useStack';
import { useQueue } from './hooks/useQueue';
import { useArray } from './hooks/useArray';
import { useLinkedList } from './hooks/useLinkedList';
import { useHashTable } from './hooks/useHashTable';
import { useSet } from './hooks/useSet';
import { ControlPanel } from './components/ControlPanel';
import { StackVisualizer } from './components/StackVisualizer';
import { QueueVisualizer } from './components/QueueVisualizer';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { LinkedListVisualizer } from './components/LinkedListVisualizer';
import { HashTableVisualizer } from './components/HashTableVisualizer';
import { SetVisualizer } from './components/SetVisualizer';
import { StackOperations } from './components/StackOperations';
import { QueueOperations } from './components/QueueOperations';
import { ArrayOperations } from './components/ArrayOperations';
import { LinkedListOperations } from './components/LinkedListOperations';
import { HashTableOperations } from './components/HashTableOperations';
import { SetOperations } from './components/SetOperations';
import { OperationLog as OperationLogComponent } from './components/OperationLog';
import styles from './DataStructureSimulator.module.css';

export const DataStructureSimulator = () => {
  const [dataStructureType, setDataStructureType] = useState<DataStructureType>('stack');
  const [dataSize, setDataSize] = useState(5);
  const [logs, setLogs] = useState<OperationLog[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  const addLog = useCallback((log: OperationLog) => {
    setLogs(prev => [...prev, log]);
  }, []);

  const stackOps = useStack(addLog);
  const queueOps = useQueue(addLog);
  const arrayOps = useArray(addLog);
  const linkedListOps = useLinkedList(addLog);
  const hashTableOps = useHashTable(addLog);
  const setOps = useSet(addLog);

  useEffect(() => {
    handleReset();
  }, [dataStructureType]);

  const handleReset = useCallback(() => {
    setLogs([]);

    switch (dataStructureType) {
      case 'stack':
        stackOps.initialize(dataSize);
        break;
      case 'queue':
        queueOps.initialize(dataSize);
        break;
      case 'array':
        arrayOps.initialize(dataSize);
        break;
      case 'linkedList':
        linkedListOps.initialize(dataSize);
        break;
      case 'hashTable':
        hashTableOps.initialize(dataSize);
        break;
      case 'set':
        setOps.initialize(dataSize);
        break;
    }
  }, [dataStructureType, dataSize, stackOps, queueOps, arrayOps, linkedListOps, hashTableOps, setOps]);

  const handleDataStructureChange = useCallback((type: DataStructureType) => {
    setDataStructureType(type);
  }, []);

  const renderVisualizer = () => {
    switch (dataStructureType) {
      case 'stack':
        return <StackVisualizer state={stackOps.state} />;
      case 'queue':
        return <QueueVisualizer state={queueOps.state} />;
      case 'array':
        return <ArrayVisualizer state={arrayOps.state} />;
      case 'linkedList':
        return <LinkedListVisualizer state={linkedListOps.state} />;
      case 'hashTable':
        return <HashTableVisualizer state={hashTableOps.state} />;
      case 'set':
        return <SetVisualizer state={setOps.state} />;
      default:
        return <div className={styles.placeholder}>選択されたデータ構造の可視化は実装中です</div>;
    }
  };

  const renderOperations = () => {
    switch (dataStructureType) {
      case 'stack':
        return (
          <StackOperations
            onPush={(value) => stackOps.push(value, animationSpeed)}
            onPop={() => stackOps.pop(animationSpeed)}
          />
        );
      case 'queue':
        return (
          <QueueOperations
            onEnqueue={(value) => queueOps.enqueue(value, animationSpeed)}
            onDequeue={() => queueOps.dequeue(animationSpeed)}
          />
        );
      case 'array':
        return (
          <ArrayOperations
            onInsertAt={(index, value) => arrayOps.insertAt(index, value, animationSpeed)}
            onRemoveAt={(index) => arrayOps.removeAt(index, animationSpeed)}
            onUpdateAt={(index, value) => arrayOps.updateAt(index, value, animationSpeed)}
          />
        );
      case 'linkedList':
        return (
          <LinkedListOperations
            onInsertAt={(index, value) => linkedListOps.insertAt(index, value, animationSpeed)}
            onRemoveAt={(index) => linkedListOps.removeAt(index, animationSpeed)}
          />
        );
      case 'hashTable':
        return (
          <HashTableOperations
            onSet={(key, value) => hashTableOps.set(key, value, animationSpeed)}
            onRemove={(key) => hashTableOps.remove(key, animationSpeed)}
            onGet={(key) => hashTableOps.get(key, animationSpeed)}
          />
        );
      case 'set':
        return (
          <SetOperations
            onAdd={(value) => setOps.add(value, animationSpeed)}
            onRemove={(value) => setOps.remove(value, animationSpeed)}
            onHas={(value) => setOps.has(value, animationSpeed)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>基本データ構造シミュレータ</h1>
        <p className={styles.subtitle}>
          データ構造の動作を視覚的に学習しましょう
        </p>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <ControlPanel
            dataStructureType={dataStructureType}
            onDataStructureChange={handleDataStructureChange}
            animationSpeed={animationSpeed}
            onSpeedChange={setAnimationSpeed}
            onReset={handleReset}
            dataSize={dataSize}
            onDataSizeChange={setDataSize}
          />
          {renderOperations()}
        </aside>

        <main className={styles.main}>
          <div className={styles.visualizer}>{renderVisualizer()}</div>
        </main>

        <aside className={styles.logPanel}>
          <OperationLogComponent logs={logs} />
        </aside>
      </div>
    </div>
  );
};
