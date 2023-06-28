import ProjectCard from "./ProjectCard";
import Link from "next/link";
import styles from "@/styles/ProjectsList.module.css";
import { ProjectData } from "@/types/typedefs";

export default function ProjectsList({ projects }: { projects: ProjectData[] }) {

  return (
    <>
      <div className={styles.projectsList}>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id}></ProjectCard>
        ))}
        <div className={styles.addProjectButton}>
          <Link href="/idea">Add Project</Link>
        </div>
      </div>
    </>
  );
}
