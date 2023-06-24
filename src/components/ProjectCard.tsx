import { Project } from "@/types/Project";
import styles from "@/styles/ProjectCard.module.css"

export default function ProjectCard({ project }: { project: Project }) {

  return (
    <div className={styles.projectCard}>
      <h3>{project.title}</h3>
      <p>{project.create_date.toDateString()}</p>
    </div>)
}