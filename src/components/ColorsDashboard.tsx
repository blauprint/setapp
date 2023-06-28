import ColorCard from "./ColorCard";
import styles from '@/styles/ColorsDashboard.module.css'
import { colorsMock } from "@/mocks/moks-colors";
import { useAppSelector } from "@/redux/hooks";
import { Color } from "@/types/typedefs";
import { useEffect } from "react";
import { store } from "@/redux/store";

export default function ColorsDashboard() {

  let colors: Color[] = store.getState().currentProject.frontend.colorScheme.colorPalette;

  // useEffect(() => {
  //   console.log(store.getState().currentProject, 'current project')
  //   colors = store.getState().currentProject.frontend.colorScheme.colorPalette;
  // })

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