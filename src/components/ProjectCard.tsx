import styles from '@/styles/ProjectCard.module.css';
import { ProjectData } from '@/types/typedefs';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch } from '@/redux/hooks';
import { addCurrentProject } from '@/redux/currentProjectSlice';
import { useAuth } from '@clerk/nextjs';
import { Auth } from '@/types/Auth';
import { deleteProjectFromStore } from '@/redux/projectsSlice';
import { deleteProject } from '@/services/projectsService';
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';

export default function ProjectCard({ project }: { project: ProjectData }) {
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
  const [isHovered, setIsHovered] = useState(false);

  //TODO need to convert project date to this format and save it
  const formattedDate = '25 Jun';
  function handleClickOnProjectCard(project: ProjectData) {
    dispatch(addCurrentProject(project));
  }

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log('got here', project.id);

    //delete from the redux store
    dispatch(deleteProjectFromStore(project.id));
    //delete from the database as well we need to make an api delete request
    deleteProject(auth, project.id);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <Link
      prefetch={false}
      onClick={() => handleClickOnProjectCard(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`/${user?.username ? user.username : user?.firstName}/projects/${project.id
        }/`}
    >
      <div
        className={styles.projectCard}
      // onClick={() => handleClickOnProjectCard(project)}
      >
        {isHovered &&
          <div className={styles.deleteBtnContainer}>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              <AiOutlineDelete size={20}
                style={{ height: '25px', position: 'relative', top: '11px', right: '6px' }}
              />
            </button>
          </div>}
        <div className={styles.title}>
          <p>{project.title}</p>
        </div>
        <div className={styles.idea}>{project.idea}</div>

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
