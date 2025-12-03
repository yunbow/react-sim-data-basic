import { LinkedListState } from '../../types';
import styles from './LinkedListVisualizer.module.css';

interface LinkedListVisualizerProps {
  state: LinkedListState;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ state }) => {
  const renderNodes = () => {
    const nodes: JSX.Element[] = [];
    let currentId = state.head;

    while (currentId !== null) {
      const node = state.nodes[currentId];
      if (!node) break;

      const isHighlighted = currentId === state.highlightId;

      nodes.push(
        <div key={currentId} className={styles.nodeWrapper}>
          <div className={`${styles.node} ${isHighlighted ? styles.highlighted : ''}`}>
            <div className={styles.value}>{node.value}</div>
          </div>
          {node.next && (
            <div className={styles.arrow}>→</div>
          )}
        </div>
      );

      currentId = node.next;
    }

    return nodes;
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {state.head === null ? (
          <div className={styles.empty}>Linked List is empty</div>
        ) : (
          <>
            <div className={styles.headLabel}>Head</div>
            <div className={styles.nodes}>{renderNodes()}</div>
          </>
        )}
      </div>
    </div>
  );
};
