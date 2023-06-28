import ColorCard from "./ColorCard";
import styles from '@/styles/ColorsDashboard.module.css'
import { ColorScheme } from "@/types/typedefs";

export default function ColorsDashboard({ colorScheme }: { colorScheme: ColorScheme }) {

  return (
    <>
      <div className={styles.colorsList}>
        {colorScheme.colorPalette.map((color) => (
          <ColorCard color={color}></ColorCard>
        ))}
      </div>
    </>
  )
}