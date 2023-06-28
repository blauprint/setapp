import ProjectMenu from "@/components/ProjectMenu";
import ProjectsList from "@/components/ProjectsList";
import { projectsMock } from "@/mocks/moks-projects";
import { useAppDispatch } from "@/redux/hooks";
import { addProjects } from "@/redux/projectsSlice";
import { getProjects } from "@/services/projectsService";
import styles from "@/styles/ProjectsPage.module.css";
import { Auth } from "@/types/Auth";
import { ProjectData } from "@/types/typedefs";
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

  // let projects: Project[] = [];

  // useEffect(() => {
  //   if (user) {
  //     getProjects(auth).then((res) => {
  //       console.log(sessionToken);
  //       projects = res;
  //     });
  //   }
  // dispatch(addProjects(projects))
  // }, [user])

  let projects: ProjectData[] = projectsMock;
  let dispatch = useAppDispatch();
  dispatch(addProjects(projects));

  return (
    <div className={styles.projectsPageWrapper}>
      <SignedIn>
        <ProjectsList projects={projects}></ProjectsList>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
