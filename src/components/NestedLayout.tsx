import ProjectMenu from "./ProjectMenu";
import styles from "@/styles/Output.module.css";
import { ReactElement } from "react";

export default function NestedLayout({ children }: { children: ReactElement }) {
  return (
    <div className={styles.outputPage}>
      <ProjectMenu />
      <main>{children}</main>
    </div>
  )
}