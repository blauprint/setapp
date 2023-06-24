import ProjectsList from "@/components/ProjectsList";

export default function Projects() {
  return (
    <>
      <HomeNavigationBar></HomeNavigationBar>
      <div className="projects-container">
        <ProjectsList></ProjectsList>
        <button>Add Project</button>
      </div>
    </>
  )
}
