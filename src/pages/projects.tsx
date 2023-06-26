import ProjectMenu from "@/components/ProjectMenu";
import ProjectsList from "@/components/ProjectsList";
import { projectsMock } from "@/mocks/moks-projects";
import { getProjects } from "@/services/projectsService";
import styles from '@/styles/ProjectsPage.module.css';
import { Auth } from "@/types/Auth";
import { Project } from "@/types/Project";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ProjectsPage() {

  const { user } = useUser()
  const { userId,
    sessionId,
    getToken,
    isLoaded,
    isSignedIn,
    signOut,
    orgId,
    orgRole,
    orgSlug,
  } = useAuth();

  const sessionToken = getToken();
  const auth: Auth = {
    userId: userId?.toString(),
    sessionId: sessionId?.toString(),
    getToken: getToken,
    isLoaded: isLoaded,
    isSignedIn: isSignedIn,
    signOut: signOut,
    orgId: orgId?.toString(),
    orgRole: orgRole?.toString(),
    orgSlug: orgSlug?.toString()
  }

  let projects: Project[] = [];

  useEffect(() => {
    if (user) {
      getProjects(auth).then((res) => {
        console.log(sessionToken);
        projects = res;
      });
    }
  }, [user])

  // const projects = projectsMock;

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
