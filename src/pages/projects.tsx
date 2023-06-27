import ProjectMenu from "@/components/ProjectMenu";
import ProjectsList from "@/components/ProjectsList";
import { projectsMock } from "@/mocks/moks-projects";
import { getProjects } from "@/services/projectsService";
import styles from "@/styles/ProjectsPage.module.css";
import { Auth } from "@/types/Auth";
import { Project } from "@/types/Project";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

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

  const token = getToken;

  const sessionToken = getToken();
  const auth: Auth = {
    userId: userId?.toString(),
    sessionId: sessionId?.toString(),
    sessionToken: token,
    isLoaded: isLoaded,
    isSignedIn: isSignedIn,
    signOut: signOut,
    orgId: orgId?.toString(),
    orgRole: orgRole?.toString(),
    orgSlug: orgSlug?.toString(),
  };



  return (
    <>
      <SignedIn>
        <div className={styles.projectsContainer}>
          {/* <ProjectsList projects={projects}></ProjectsList> */}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
