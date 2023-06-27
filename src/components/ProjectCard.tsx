import { Project } from "@/types/Project";
import styles from "@/styles/ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.projectCard}>
      <p className={styles.title}>{project.name}</p>

      <div className={styles.details}>
        <p className={styles.tech}>{project.techStacks?.join(" / ")}</p>
        {/* TODO the data is not dyamic at the moment  must intergrate date-fns for this*/}
        <p className={styles.created_at}>24 June</p>
      </div>
    </div>
  );
}
