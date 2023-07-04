import styles from '@/styles/ColorCard.module.css';
import { Color } from '@/types/typedefs';

export default function ColorCard({ color }: { color: Color }) {
  return (
    <ul className={styles.colorCard} style={{ backgroundColor: color.hex }}>
      <li>{color.name}</li>
      <li>{color.hex}</li>
      <li>{color.rgb}</li>
    </ul>
  );
}
