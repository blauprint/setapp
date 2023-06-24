import { Project } from "@/types/Project";
import styles from "@/styles/ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.projectCard}>
      <p className={styles.title}>{project.title}</p>

      <div className="items">
        {project.intro.split(" ").map((item) => {
          return (
            <p key={crypto.randomUUID()} className={styles.intro}>
              {item}
            </p>
          );
        })}
      </div>

      <div className={styles.techAndDate}>
        <p className={styles.tech}>{project.tech.join(" / ")}</p>
        <p className={styles.date}> 24 June</p>
      </div>
    </div>
  );
}

{
  /* <div className="items">
        {project.intro.split(" ").map((item) => {
          return (
            <p key={crypto.randomUUID()} className={styles.intro}>
              {item}
            </p>
          );
        })}
      </div> */
}
