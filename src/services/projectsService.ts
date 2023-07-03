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


export async function postProjects(auth: Auth, projectBody: ProjectData): Promise<{id: string}> {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
    body: JSON.stringify(projectBody),
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, options);
  const data = await response.json();
  return data;
}


  const projectPromise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${id}`, options);
  const response = await projectPromise.json();
  return response;
}