import { Auth } from '@/types/Auth';
import { Project } from '@/types/Project';

const baseUrl = "http://localhost:5000"

export async function getProjects(auth: Auth): Promise<Project[]> {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auth)
  }
  const projectsPromise = await fetch(`${baseUrl}/projects`, options);
  const projects: Project[] = await projectsPromise.json();

  return projects;
} 