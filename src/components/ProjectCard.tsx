import { Project } from "@/types/Project";

export default function ProjectCard({ project }: { project: Project }) {

  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.create_date.toDateString()}</p>
    </div>)
}