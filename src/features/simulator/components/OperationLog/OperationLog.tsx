import { OperationLog as OperationLogType } from '../../types';
import styles from './OperationLog.module.css';

interface OperationLogProps {
  logs: OperationLogType[];
}

export const OperationLog: React.FC<OperationLogProps> = ({ logs }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>操作ログ</h3>
      <div className={styles.logList}>
        {logs.length === 0 ? (
          <div className={styles.empty}>操作履歴はありません</div>
        ) : (
          [...logs].reverse().slice(0, 20).map((log) => (
            <div key={log.id} className={styles.logItem}>
              <span className={styles.operation}>{log.operation}</span>
              <span className={styles.description}>{log.description}</span>
              <span className={styles.timestamp}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
