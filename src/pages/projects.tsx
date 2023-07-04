'use client';
import ProjectsList from '@/components/ProjectsList';
import { selectProject } from '@/redux/currentProjectSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addProjects } from '@/redux/projectsSlice';
import { getProjects } from '@/services/projectsService';
import styles from '@/styles/ProjectsPage.module.css';
import { Auth } from '@/types/Auth';
import { ProjectData } from '@/types/typedefs';
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from '@clerk/nextjs';
import { useEffect } from 'react';

export default function ProjectsPage() {
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

  const projects: ProjectData[] = useAppSelector(selectProject);

  useEffect(() => {
    if (user && projects.length === 0) {
      console.log('i ran');
      getProjects(auth).then((res) => {
        dispatch(addProjects(res));
      });
    }
  }, [user]);

  return (
    <div className={styles.projectsPageWrapper}>
      <SignedIn>
        <ProjectsList projects={projects} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
