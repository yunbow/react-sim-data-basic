import { QueueState } from '../../types';
import styles from './QueueVisualizer.module.css';

interface QueueVisualizerProps {
  state: QueueState;
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ state }) => {
  return (
    <div className={styles.container}>
      <div className={styles.queue}>
        {state.items.length === 0 ? (
          <div className={styles.empty}>Queue is empty</div>
        ) : (
          <>
            <div className={styles.labels}>
              <div className={styles.frontLabel}>Front →</div>
              <div className={styles.rearLabel}>← Rear</div>
            </div>
            <div className={styles.items}>
              {state.items.map((item, index) => {
                const isHighlighted = index === state.highlightIndex;
                return (
                  <div
                    key={`${index}-${item}`}
                    className={`${styles.item} ${isHighlighted ? styles.highlighted : ''}`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
