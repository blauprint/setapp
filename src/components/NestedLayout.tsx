'use client';
import ProjectMenu from './ProjectMenu';
import styles from '@/styles/Output.module.css';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function NestedLayout({ children }: { children: ReactElement }) {
  return (
    <div className={styles.outputPage}>
      <ProjectMenu />
      <main className={styles.outputContent}>{children}</main>
    </div>
  );
}
