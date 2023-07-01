import ProjectsList from "@/components/ProjectsList";
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
import { useEffect, useState } from "react";

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
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    if (user) {
      getProjects(auth).then((res) => {
        console.log(res);
        setProjects(res);
        dispatch(addProjects(res))
      });
    }
  }, [user]);

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
