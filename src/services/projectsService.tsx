import { Auth } from '@/types/Auth';
import { Project } from '@/types/Project';

const baseUrl = "http://localhost:5000"

export async function getProjects(auth: Auth): Promise<Project[]> {
  const projectsPromise = await fetch(`${baseUrl}/projects`);
  const projects: Project[] = await projectsPromise.json();

  return projects;
} 