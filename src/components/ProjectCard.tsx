import styles from "@/styles/ProjectCard.module.css";
import { ProjectData } from "@/types/typedefs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCurrentProject } from "@/redux/currentProjectSlice";
import { store } from "@/redux/store";

export default function ProjectCard({ project }: { project: ProjectData }) {

  let router = useRouter();
  const { user } = useUser()
  let dispatch = useAppDispatch();


  function handleClickOnProjectCard(project: ProjectData) {
    const url = `/${user?.username ? user.username : user?.firstName}/${project.projectName}/output`
    dispatch(addCurrentProject(project));
    router.push(url);
  }

  return (
    <div className={styles.projectCard} onClick={() => handleClickOnProjectCard(project)}>
      <p className={styles.title}>{project.projectName}</p>

      <div className={styles.details}>
        <p className={styles.tech}>{`${project.backend.framework.name}/${project.frontend.framework.name}`}</p>
        <p className={styles.created_at}>{(new Date(project.createdAt)).toLocaleString()}</p>
      </div>
    </div>
  );
}
