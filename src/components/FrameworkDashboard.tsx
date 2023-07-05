import { Technology } from '@/types/typedefs';
import styles from '@/styles/FrameworkDashboard.module.css';
import { MdChevronRight } from 'react-icons/md';

export default function FrameworkDashboard({
  framework,
}: {
  framework: Technology;
}) {
  return (
    <div className={styles.frameworkContainer}>

      <h1 className={styles.frameworkName}>
        {framework.name}
      </h1>

      <div className={styles.frameworkElement}>

        <h2 className={styles.descriptionTitle}>
          Why?
        </h2>

        <p className={styles.description}>
          {framework.description}
        </p>

      </div>

      <div className={styles.frameworkElement}>

        <h2 className={styles.descriptionTitle}>
          To sum up:
        </h2>

        <p>{framework.whyGoodOption}</p>
      </div>

      <div className={styles.frameworkElementLink}>

        <h2 className={styles.descriptionTitle}>
          <MdChevronRight />
        </h2>

        <a className={styles.link} href={framework.link}>
          {framework.link}
        </a>

      </div>
    </div>
  );
}
