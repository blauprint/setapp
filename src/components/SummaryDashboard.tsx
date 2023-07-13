'use client';
import { ProjectData } from '@/types/typedefs';
import styles from '@/styles/SummaryDashboard.module.css';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export default function SummaryDashboard({
  project,
}: {
  project: ProjectData;
}) {
  let title = useAppSelector((state: RootState) => state.currentProject.title);

  return (
    <div className={styles.summaryContainer}>
      <h1 className={styles.summaryTitle}>{title}</h1>
      <hr />
      <p className={styles.projectSummary}>{project.summary}</p>
      <hr />
      <p className={styles.projectSummary}>Backend Framework: {project.backend.framework.name}</p>
      <hr />
      <p className={styles.projectSummary}>Database: {project.backend.database.name}</p>
      <hr />
      <p className={styles.projectSummary}>Frontend Framework: {project.frontend.framework.name}</p>
      <hr />
      <p className={styles.projectSummary}>Color schema:</p>
      <ul>
        {project.frontend.colorScheme.colorPalette.colors.map(color => <li className={styles.projectSummary}>{color.name}</li>)}
      </ul>
    </div>
  );
}
