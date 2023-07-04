import ProjectMenu from './ProjectMenu';
import styles from '@/styles/Output.module.css';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function NestedLayout({ children }: { children: ReactElement }) {
  const router = useRouter();
  return (
    <div className={styles.outputPage}>
      <ProjectMenu
        userName={router.query.userName!}
        projectId={router.query.projectId!}
      />
      {children}
    </div>
  );
}
