import { StackState } from '../../types';
import styles from './StackVisualizer.module.css';

interface StackVisualizerProps {
  state: StackState;
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({ state }) => {
  return (
    <div className={styles.container}>
      <div className={styles.stack}>
        {state.items.length === 0 ? (
          <div className={styles.empty}>Stack is empty</div>
        ) : (
          <>
            <div className={styles.topLabel}>← Top</div>
            {[...state.items].reverse().map((item, index) => {
              const actualIndex = state.items.length - 1 - index;
              const isHighlighted = actualIndex === state.highlightIndex;
              return (
                <div
                  key={`${actualIndex}-${item}`}
                  className={`${styles.item} ${isHighlighted ? styles.highlighted : ''}`}
                >
                  {item}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
