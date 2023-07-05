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

  const projectsPromise = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    options,
  );
  const response = await projectsPromise.json();
  return response;
}

export async function postProject(auth: Auth, projectBody: ProjectData) {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
    body: JSON.stringify(projectBody),
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    options,
  );
  const data = await response.json();
  return data;
}

export async function getProjectById(
  auth: Auth,
  id: string | string[],
): Promise<ProjectData> {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
  };
  const projectPromise = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${id}`,
    options,
  );
  const response = await projectPromise.json();
  return response;
}

export async function deleteProject(auth: Auth, id: string): Promise<void> {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
  };

  const deleteProject = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${id}`,
    options,
  );

  const response = await deleteProject.json();
  return response;
}


export async function deleteTodoService(auth: Auth, id: string): Promise<void> {
  auth.sessionToken = await auth.sessionToken();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
  };

  const deleteTodo = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/todo/${id}`,
    options,
  );
  const response = await deleteTodo.json();
  return response;
}


export async function updateProjectTitle(auth: Auth, id: string, title: any) {
  if (typeof auth.sessionToken !== 'string') {
    auth.sessionToken = await auth.sessionToken();
  }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.stringify(auth),
    },
    body: JSON.stringify(title),
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${id}/title`,
    options,
  );
  const data = await response.json();
  return data;
}