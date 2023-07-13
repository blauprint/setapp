'use client'
import { Technology } from '@/types/typedefs';
import styles from '@/styles/FrameworkDashboard.module.css';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export default function FrameworkDashboard() {

  const select = useAppSelector((state: RootState) => state.selected);
  let framework: Technology = {
    name: '',
    whyGoodOption: '',
    description: '',
    link: '',
  };

  if (select === 'frameworkBE') {
    useAppSelector((state: RootState) => { framework = state.currentProject.backend.framework })
  } else if (select === 'frameworkFE') {
    useAppSelector((state: RootState) => { framework = state.currentProject.frontend.framework })
  }

  return (
    <div className={styles.frameworkContainer}>
      <h1 className={styles.frameworkName}>{framework.name}</h1>
      <div className={styles.frameworkElement}>
        <p className={styles.frameworkDescription}>{framework.description}</p>

        <h2 className={styles.descriptionTitle}>
          Why should I choose it for my app?
        </h2>

        <p className={styles.description}>{framework.whyGoodOption}</p>
      </div>

      <div className={styles.frameworkElement}>
        <hr />
        <h2 className={styles.descriptionTitle}>Learn more</h2>
        <p className={styles.description}>
          Official {framework.name} website:
          <Link href={framework.link} className={styles.link}>
            {framework.link}
          </Link>
        </p>
      </div>
    </div>
  );
}
