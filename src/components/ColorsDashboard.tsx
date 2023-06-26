import { Color } from "@/types/Color";
import ColorCard from "./ColorCard";
import styles from '@/styles/ColorsDashboard.module.css'
import { colorsMock } from "@/mocks/moks-colors";

export default function ColorsDashboard() {

  const colors: Color[] = colorsMock;


  return (
    <>
      <div className={styles.colorsList}>
        {colors.map((color) => (
          <ColorCard color={color}></ColorCard>
        ))}
      </div>
    </>
  )
}