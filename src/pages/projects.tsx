import ProjectMenu from "@/components/ProjectMenu";
import ProjectsList from "@/components/ProjectsList";
//import { projectsMock } from "@/mocks/projects";
import { useAppDispatch } from "@/redux/hooks";
import { addProjects } from "@/redux/projectsSlice";
import { getProjects } from "@/services/projectsService";
import styles from "@/styles/ProjectCard.module.css";
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
        setProjects(res);
        dispatch(addProjects(res))
      });
    }
  }, [user]);

  return (
    <>
      <SignedIn>
        <div>
          {/* <ProjectsList projects={projects}></ProjectsList> */}
           {projects.map((project) => (
            <div className={styles.projectCard} key={project.id}>
              <div>Idea: {project.idea}</div>
              <div>Created At: {project.createdAt}</div>
            </div>
          ))}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
