import { type ReactElement } from "react";
import { RootState } from "@/redux/store";
import { ProjectData } from "@/types/typedefs";
import { NextPageWithLayout } from "@/pages/_app";
import NestedLayout from "@/components/NestedLayout";
import FrameworkDashboard from "@/components/FrameworkDashboard";
import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";
import { useSelector } from "react-redux";
import ModelDashboard from "@/components/ModelDashboard";
import ColorsDashboard from "@/components/ColorsDashboard";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { getProjectById } from "@/services/projectsService";
import { useAuth } from "@clerk/nextjs";
import { Auth } from "@/types/Auth";


const Page: NextPageWithLayout = () => {

  const router = useRouter();

  let project: ProjectData = useAppSelector((state: RootState) => state.currentProject);
  let select: string = useSelector((state: RootState) => state.selected);

  const id: string = (router.pathname.match(/[0-9]*/) || [])[0] || '';
  console.log(id);

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

  if (project.idea === '') {
    getProjectById(auth, id).then(res => { project = res });
  }

  if (project && select === "todosBE") {
    return <TodoList todos={project.backend.todoList} />;
  } else if (select === "frameworkBE") {
    return <FrameworkDashboard framework={project.backend.framework} />;
  } else if (select === "model") {
    return <ModelDashboard model={project.backend.database} />;
  } else if (select === "todosFE") {
    return <TodoList todos={project.frontend.todoList} />;
  } else if (select === "frameworkFE") {
    return <FrameworkDashboard framework={project.frontend.framework} />;
  } else if (select === "colors") {
    return <ColorsDashboard colorScheme={project.frontend.colorScheme} />;
  } else {
    return (
      <>
        <div>{project.idea}</div>
        <div>{project.summary}</div>
      </>
    );
  }
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export default Page;
