import { Project } from "@/types/Project";
import ProjectCard from "./ProjectCard";

import styles from '@/styles/ProjectsList.module.css';
import Link from "next/link";

export default function ProjectsList({ projects }: { projects: Project[] }) {

  return (
    <>
      <div className={styles.projectsList}>
        {projects.map((project) => (<ProjectCard project={project} key={project.id}></ProjectCard>))}
        <div className={styles.addProjectButton}><Link href='/idea'>Add Project</Link></div>
      </div>
    </>
  )
}