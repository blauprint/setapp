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
    <>
      <h1>{title}</h1>
      <p className={styles.projectSummary}>{project.summary}</p>
    </>
  );
}
