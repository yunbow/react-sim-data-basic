import { ArrayState } from '../../types';
import styles from './ArrayVisualizer.module.css';

interface ArrayVisualizerProps {
  state: ArrayState;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ state }) => {
  return (
    <div className={styles.container}>
      <div className={styles.array}>
        {state.items.length === 0 ? (
          <div className={styles.empty}>Array is empty</div>
        ) : (
          state.items.map((item, index) => {
            const isHighlighted = index === state.highlightIndex;
            return (
              <div key={`${index}-${item}`} className={styles.itemWrapper}>
                <div className={styles.index}>[{index}]</div>
                <div
                  className={`${styles.item} ${isHighlighted ? styles.highlighted : ''}`}
                >
                  {item}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
