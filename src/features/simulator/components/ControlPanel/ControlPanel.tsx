import { DataStructureType } from '../../types';
import { Button, Select, Slider } from '../../../../components';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  dataStructureType: DataStructureType;
  onDataStructureChange: (type: DataStructureType) => void;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  dataSize: number;
  onDataSizeChange: (size: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  dataStructureType,
  onDataStructureChange,
  animationSpeed,
  onSpeedChange,
  onReset,
  dataSize,
  onDataSizeChange,
}) => {
  const dataStructureOptions = [
    { value: 'stack', label: 'Stack' },
    { value: 'queue', label: 'Queue' },
    { value: 'array', label: 'Array' },
    { value: 'linkedList', label: 'Linked List' },
    { value: 'hashTable', label: 'Hash Table' },
    { value: 'set', label: 'Set' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <label className={styles.label}>データ構造</label>
        <Select
          value={dataStructureType}
          onChange={(value) => onDataStructureChange(value as DataStructureType)}
          options={dataStructureOptions}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>データサイズ</label>
        <Slider
          value={dataSize}
          onChange={onDataSizeChange}
          min={0}
          max={20}
          step={1}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>アニメーション速度</label>
        <Slider
          value={animationSpeed}
          onChange={onSpeedChange}
          min={0}
          max={2000}
          step={100}
        />
      </div>

      <div className={styles.controls}>
        <Button onClick={onReset} variant="outline">
          リセット
        </Button>
      </div>
    </div>
  );
};
