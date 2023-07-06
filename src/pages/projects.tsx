'use client';
import ProjectsList from '@/components/ProjectsList';
import { selectAllProjects } from '@/redux/currentProjectSlice';
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
  const projects: ProjectData[] = useAppSelector(selectAllProjects);
  let sortedProjects = [...projects];
  sortedProjects = sortedProjects.sort((a, b) => {
    const dateA = a.createdAt || new Date(0);
    const dateB = b.createdAt || new Date(0);
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  });
  useEffect(() => {
    if (user) {
      getProjects(auth).then((res) => {
        dispatch(addProjects(res));
      });
    }
  }, []);

  return (
    <div className={styles.projectsPageWrapper}>
      <SignedIn>
        <ProjectsList projects={sortedProjects} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
