import { SetState } from '../../types';
import styles from './SetVisualizer.module.css';

interface SetVisualizerProps {
  state: SetState;
}

export const SetVisualizer: React.FC<SetVisualizerProps> = ({ state }) => {
  const items = Array.from(state.items).sort((a, b) => a - b);

  return (
    <div className={styles.container}>
      <div className={styles.set}>
        {items.length === 0 ? (
          <div className={styles.empty}>Set is empty</div>
        ) : (
          items.map((item) => {
            const isHighlighted = item === state.highlightItem;
            return (
              <div
                key={item}
                className={`${styles.item} ${isHighlighted ? styles.highlighted : ''}`}
              >
                {item}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
