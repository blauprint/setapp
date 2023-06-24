import { Project } from "@/types/Project";
import { projectsMock } from "./moks-projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {

  // const projects: Project[] = [];

  const projects = projectsMock;

  return (
    <>
      <div className="projects-list">
        {projects.map((project) => (<ProjectCard project={project}></ProjectCard>))}
      </div>
    </>
  )
}