//import { addProjects } from '@/redux/projectsSlice';
import { Auth } from '@/types/Auth';
import { ProjectData } from '@/types/typedefs';

export async function getProjects(auth: Auth): Promise<ProjectData[]> {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
  }

  const projectsPromise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, options);
  console.log(projectsPromise, 'parsing projects')
    const response = await projectsPromise.json();
    console.log(response);
    return response;
  // const dispatch = useAppDispatch();
  // dispatch(addProjects(projects));
}


