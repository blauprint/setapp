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
  };

  const projectsPromise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, options);
  const response = await projectsPromise.json();
  return response;
}


export async function getProjectById(auth: Auth, id: string): Promise<ProjectData> {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
  };

  const projectPromise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, options);
  const response = await projectPromise.json();
  return response;
}
