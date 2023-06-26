import ProjectsList from "@/components/ProjectsList";
import styles from "@/styles/ProjectsPage.module.css";
import { MdAddCircle } from "react-icons/md";
export default function ProjectsPage() {
  return (
    <>
      {/* <HomeNavigationBar></HomeNavigationBar> */}
      <div className={styles.projectsContainer}>
        <ProjectsList></ProjectsList>
        <div className={styles.addProjectButton}>
          <div className={styles.btnContents}>
            <MdAddCircle className={styles.addCircle} size={30} />
            <p>New Project</p>
          </div>
        </div>
      </div>
    </>
  );
}
