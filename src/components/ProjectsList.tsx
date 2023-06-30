import ProjectCard from './ProjectCard';
import Link from 'next/link';
import styles from '@/styles/ProjectsList.module.css';
import { ProjectData } from '@/types/typedefs';
import { MdAddCircleOutline } from 'react-icons/md';

export default function ProjectsList({
  projects,
}: {
  projects: ProjectData[];
}) {
  return (
    <>
      <Link className={styles.addProjectButton} href="/idea">
        <div className={styles.content}>
          <p>
            <MdAddCircleOutline size={35} />
          </p>
          <p>Add Project</p>
        </div>
      </Link>

      {projects.map((project) => (
        <ProjectCard project={project} key={crypto.randomUUID()}></ProjectCard>
      ))}
    </>
  );
}
