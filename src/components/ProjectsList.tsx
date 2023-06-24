import { Project } from "@/types/Project";
import { projectsMock } from "./moks-projects";
import ProjectCard from "./ProjectCard";

import styles from '@/styles/ProjectsList.module.css';

export default function ProjectsList() {

  // const projects: Project[] = [];

  const projects = projectsMock;

  return (
    <>
      <div className={styles.projectsList}>
        {projects.map((project) => (<ProjectCard project={project} key={project.id}></ProjectCard>))}
      </div>
    </>
  )
}