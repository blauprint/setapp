import styles from '@/styles/ProjectCard.module.css';
import { ProjectData } from '@/types/typedefs';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch } from '@/redux/hooks';
import { addCurrentProject } from '@/redux/currentProjectSlice';

import { format, parse } from 'date-fns';
export default function ProjectCard({ project }: { project: ProjectData }) {
  let router = useRouter();
  const { user } = useUser();
  let dispatch = useAppDispatch();

  //TODO need to convert project date to this format and save it
  const formattedDate = '25 Jun';

  function handleClickOnProjectCard(project: ProjectData) {
    const url = `/${user?.username ? user.username : user?.firstName}/${
      project.projectName
    }/output`;
    dispatch(addCurrentProject(project));

    router.push(url);
  }

  return (
    <div
      className={styles.projectCard}
      onClick={() => handleClickOnProjectCard(project)}
    >
      <div className={styles.title}>{project.projectName}</div>
      <div className={styles.idea}>{project.idea + '...'}</div>

      <div className={styles.details}>
        <div
          className={styles.tech}
        >{`${project.backend.framework.name} / ${project.frontend.framework.name}`}</div>
        <div className={styles.created_at}>{formattedDate}</div>
      </div>
    </div>
  );
}
