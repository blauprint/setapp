import ColorCard from './ColorCard';
import styles from '@/styles/ColorsDashboard.module.css';
import { ColorScheme, Color } from '@/types/typedefs';

export default function ColorsDashboard({
  colorScheme,
}: {
  colorScheme: ColorScheme;
}) {
  return (
    <>
      <ul className={styles.colorsList}>
        {colorScheme.colorPalette.colors.map((c: Color) => (
          <li key={crypto.randomUUID()}>
            <ColorCard color={c} />
          </li>
        ))}
      </ul>
    </>
  );
}
