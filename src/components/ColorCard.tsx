import { Color } from "@/types/Color";
import styles from '@/styles/ColorCard.module.css'

export default function ColorCard({ color }: { color: Color }) {


  return (

    <div className={styles.colorCard} style={{ backgroundColor: color.hex }}>
      <p>{color.name}</p>
      <p>{color.hex}</p>
      <p>{color.rgb}</p>
    </div>

  )
}