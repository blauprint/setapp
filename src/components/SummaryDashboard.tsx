import { ProjectData } from '@/types/typedefs';
import styles from '@/styles/SummaryDashboard.module.css';

export default function SummaryDashboard({
  project,
}: {
  project: ProjectData;
}) {
  return (
    <>
      <h1>{project.title}</h1>
      <p className={styles.projectSummary}>{project.summary}</p>
    </>
  );
}
