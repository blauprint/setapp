import ProjectCard from "./ProjectCard";
import Link from "next/link";
import styles from "@/styles/ProjectsList.module.css";
import { ProjectData } from "@/types/typedefs";

export default function ProjectsList({
  projects,
}: {
  projects: ProjectData[];
}) {
  return (
    <>
      <Link className={styles.addProjectButton} href="/idea">
        Add Project
      </Link>

      {projects.map((project) => (
        <ProjectCard project={project} key={project.id}></ProjectCard>
      ))}
    </>
  );
}
