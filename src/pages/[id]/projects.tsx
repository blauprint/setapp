import ProjectsList from "@/components/ProjectsList";
import styles from '@/styles/ProjectsPage.module.css';

export default function ProjectsPage() {
  return (
    <>
      {/* <HomeNavigationBar></HomeNavigationBar> */}
      <div className={styles.projectsContainer}>
        <ProjectsList></ProjectsList>
        <button className={styles.addProjectButton}>Add Project</button>
      </div>
    </>
  )
}
