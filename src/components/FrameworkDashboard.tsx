import { Technology } from '@/types/typedefs';
import styles from '@/styles/FrameworkDashboard.module.css'
import { MdChevronRight } from 'react-icons/md';

export default function FrameworkDashboard({ framework }: { framework: Technology }) {

  return (
    <div className={styles.frameworkContainer}>
      <div className={styles.frameworkName}>{framework.name}</div>
      <div className={styles.frameworkElement}>
        <p><span className={styles.comment}>why? </span>{framework.description}</p>
      </div>
      <div className={styles.frameworkElement}>
        <p><span className={styles.comment}>to sum up: </span>{framework.whyGoodOption}</p>
      </div>
      <div className={styles.frameworkElementLink}>
        <span className={styles.comment}><MdChevronRight /></span><a className={styles.link} href={framework.link}>{framework.link}</a>
      </div >
    </div>
  )
}