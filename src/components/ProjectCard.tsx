import styles from '@/styles/ProjectCard.module.css';
import { ProjectData } from '@/types/typedefs';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch } from '@/redux/hooks';
import { addCurrentProject } from '@/redux/currentProjectSlice';
import { useAuth } from '@clerk/nextjs';
import { Auth } from '@/types/Auth';
import { deleteProjectFromStore } from '@/redux/projectsSlice';

import { deleteProject } from '@/services/projectsService';
import { DeleteForever } from '@mui/icons-material';

import React from 'react';
import Link from 'next/link';
export default function ProjectCard({ project }: { project: ProjectData }) {
  let router = useRouter();
  const { user } = useUser();
  const {
    userId,
    sessionId,
    isLoaded,
    getToken,
    isSignedIn,
    signOut,
    orgId,
    orgRole,
    orgSlug,
  } = useAuth();

  const auth: Auth = {
    userId: userId?.toString(),
    sessionId: sessionId?.toString(),
    sessionToken: getToken,
    isLoaded: isLoaded,
    isSignedIn: isSignedIn,
    signOut: signOut,
    orgId: orgId?.toString(),
    orgRole: orgRole?.toString(),
    orgSlug: orgSlug?.toString(),
  };

  let dispatch = useAppDispatch();

  //TODO need to convert project date to this format and save it
  const formattedDate = '25 Jun';

  function handleClickOnProjectCard(project: ProjectData) {
    //TODO: maybe use Link from nextjs instead of router.push
    // const url = `/${user?.username ? user.username : user?.firstName}/${
    //   project.id
    // }/output`;
    dispatch(addCurrentProject(project));

    // router.push(url);
  }

  function handleDelete(e: React.SyntheticEvent) {
    e.stopPropagation();

    //delete from the redux store
    dispatch(deleteProjectFromStore(project.id));

    //delete from the database as well we need to make an api delete request
    deleteProject(auth, project.id);
  }

  return (
    <Link
      prefetch={false}
      onClick={() => handleClickOnProjectCard(project)}
      href={`/${user?.username ? user.username : user?.firstName}/projects/${project.id
        }/`}
    >
      <div
        className={styles.projectCard}
      // onClick={() => handleClickOnProjectCard(project)}
      >
        <div className={styles.deleteBtnContainer}>
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            <DeleteForever
              style={{ height: '25px', position: 'relative', top: '3px' }}
            />
          </button>
        </div>
        <div className={styles.title}>
          <p>{project.title}</p>
        </div>
        <div className={styles.idea}>{project.idea + '...'}</div>

        <div className={styles.details}>
          <div
            className={styles.tech}
          >{`${project.backend.framework.name} / ${project.frontend.framework.name}`}</div>
          <div className={styles.createdAt}>{formattedDate}</div>
        </div>
      </div>
    </Link>
  );
}
