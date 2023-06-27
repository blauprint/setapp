import { Auth } from '@/types/Auth';
import { Project } from '@/types/Project';

export async function getProjects(auth: Auth): Promise<Project[]> {
  // auth.sessionToken = await auth.sessionToken;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth': JSON.stringify(auth),
    },
  }

  const projectsPromise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, options);
  const projects: Project[] = await projectsPromise.json();

  return projects;
} 
