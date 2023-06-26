import ProjectMenu from "@/components/ProjectMenu";
import ProjectsList from "@/components/ProjectsList";
import { projectsMock } from "@/mocks/moks-projects";
import styles from '@/styles/ProjectsPage.module.css';
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function ProjectsPage() {


  // const projects: Project[] = [];

  const projects = projectsMock;

  return (
    <>
      <SignedIn>
        <div className={styles.projectsContainer}>
          <ProjectsList projects={projects}></ProjectsList>
          <button className={styles.addProjectButton}>Add Project</button>
        </div>
      </SignedIn>
      <SignedOut><RedirectToSignIn></RedirectToSignIn></SignedOut>
    </>
  )
}
