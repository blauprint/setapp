import styles from '@/styles/ColorCard.module.css';
import { Color } from '@/types/typedefs';

export default function ColorCard({
  color,
  handleClick,
}: {
  color: Color;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div className={styles.colorCard} style={{ backgroundColor: color.hex }}>
      <div className={styles.colorCardText}>
        <div className={styles.colorName}>{color.name}</div>
        <hr />
        <div className={styles.colorCodesContainer}>
          <div className={styles.colorCodeColumn}>
            <div>HEX</div>
            <div className={styles.colorCode} onClick={handleClick}>
              {color.hex}
            </div>
          </div>
          <div className={styles.colorCodeColumn}>
            <div>RGB</div>
            <div className={styles.colorCode} onClick={handleClick}>
              {color.rgb}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
