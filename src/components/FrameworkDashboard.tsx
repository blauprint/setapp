import { Technology } from '@/types/typedefs';
import styles from '@/styles/FrameworkDashboard.module.css';
import { MdChevronRight } from 'react-icons/md';
import Link from 'next/link';

export default function FrameworkDashboard({
  framework,
}: {
  framework: Technology;
}) {
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
        {/* <h2 className={styles.descriptionTitle}>
          <MdChevronRight />
        </h2> */}

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
