"use client";
import { useEffect, type ReactElement, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { getProjectById } from "@/services/projectsService";
import { useAuth } from "@clerk/nextjs";
import { Auth } from "@/types/Auth";
import { addCurrentProject } from "@/redux/currentProjectSlice";


const Page: NextPageWithLayout = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  let project: ProjectData = useAppSelector((state: RootState) => state.currentProject);

  let select: string = useSelector((state: RootState) => state.selected);
  // let [url, setUrl] = useState('');

  // let [id, setId] = useState('');
  // let [project, setProject] = useState({
  //   id: '', 
  //   summary: '',
  //   idea: '',
  //   title: '',
  //   frontend: {
  //     todoList: [],
  //     framework: {
  //       name: '',
  //       whyGoodOption: '',
  //       description: '',
  //       link: ''
  //     },
  //     colorScheme: {
  //       whyGoodOption: '',
  //       colorPalette: {
  //         color: []
  //       }
  //     },
  //   },

  //   backend: {
  //     todoList: [],
  //     framework: {
  //       name: '',
  //       whyGoodOption: '',
  //       description: '',
  //       link: ''
  //     },
  //     database: {
  //       name: '',
  //       whyGoodOption: '',
  //       description: '',
  //       link: '',
  //       schema: ''
  //     },
  //   },
  //   createdAt: 0
  // });


  let id: string = '' //(router.asPath.match(/\/\w+\/(\w+)\/output/) || [])[1] || '';
  // console.log(router.asPath)
  // console.log(id, 'id==============================');

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

  // setUrl(router.asPath)

  // useEffect(() => {
  // setId((router.asPath.match(/\/\w+\/(\w+)\/output/) || [])[1] || '');
  // setProject(useAppSelector((state: RootState) => state.currentProject));
  id = (router.asPath.match(/\/\w+\/(\w+)\/output/) || [])[1] || '';
  console.log(window.location.href)
  console.log(id, 'id==============================');
  // }, []);



  useEffect(() => {
    console.log(id, 'ooooooooooooooooooooooo')
    if (!project.idea || project.idea === '') {
      console.log('calling backend');
      getProjectById(auth, id).then(res => {
        console.log(res, 'res+++++++++++++++++++++');
        // setProject(res[0]);
        project = res;
        dispatch(addCurrentProject(res));
        // project = useAppSelector((state: RootState) => state.currentProject);
      });
    }
  }, [])



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
