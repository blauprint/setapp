import ProjectsList from "@/components/ProjectsList";
import styles from "@/styles/ProjectsPage.module.css";
import { SiStartrek } from "react-icons/si";
export default function ProjectsPage() {
  return (
    <>
      {/* <HomeNavigationBar></HomeNavigationBar> */}
      <div className={styles.projectsContainer}>
        <ProjectsList></ProjectsList>
        <div className={styles.addProjectButton}>
          <div>
            <p>
              <SiStartrek />
            </p>
            <p>Add New Project</p>
          </div>
        </div>
      </div>
    </>
  );
}
