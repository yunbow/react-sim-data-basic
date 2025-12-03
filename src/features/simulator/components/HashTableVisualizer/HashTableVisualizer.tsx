import { HashTableState } from '../../types';
import styles from './HashTableVisualizer.module.css';

interface HashTableVisualizerProps {
  state: HashTableState;
}

export const HashTableVisualizer: React.FC<HashTableVisualizerProps> = ({ state }) => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {state.buckets.map((bucket, index) => {
          const isHighlighted = index === state.highlightIndex;
          return (
            <div key={index} className={styles.bucketWrapper}>
              <div className={styles.index}>[{index}]</div>
              <div className={`${styles.bucket} ${isHighlighted ? styles.highlighted : ''}`}>
                {bucket.length === 0 ? (
                  <div className={styles.emptyBucket}>empty</div>
                ) : (
                  <div className={styles.items}>
                    {bucket.map((item, itemIndex) => (
                      <div key={itemIndex} className={styles.item}>
                        <span className={styles.key}>{item.key}</span>
                        <span className={styles.separator}>:</span>
                        <span className={styles.value}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
