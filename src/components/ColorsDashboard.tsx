import ColorCard from './ColorCard';
import styles from '@/styles/ColorsDashboard.module.css';
import { ColorScheme } from '@/types/typedefs';

export default function ColorsDashboard({
  colorScheme,
}: {
  colorScheme: ColorScheme;
}) {
  return (
    <>
      <ul className={styles.colorsList}>
        {colorScheme.colorPalette.map((color) => (
          <li key={crypto.randomUUID()}>
            <ColorCard color={color} />
          </li>
        ))}
      </ul>
    </>
  );
}
