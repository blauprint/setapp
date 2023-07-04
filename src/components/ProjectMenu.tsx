//WORK IN PROGRESS
//TODO: Fix links and styles

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '@/styles/ProjectMenu.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSelected } from '@/redux/selectedSlice';
import Link from 'next/link';

export default function ProjectMenu({
  userName,
  projectId,
}: {
  userName: string | string[];
  projectId: string | string[];
}) {
  const dispatch = useAppDispatch();
  // const currentProject = useAppSelector((state) => state.currentProject);

  return (
    <>
      <div className={styles.menu}>
        <Link
          className={styles.menuButton}
          onClick={() => dispatch(addSelected('overview'))}
          href={{
            pathname: `/${userName}/${projectId}/`,
            query: {
              id: 'overview',
            },
          }}
        >
          Overview
        </Link>
        <div>
          <Accordion className={styles.accordion} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
              aria-controls='backend'
              id='backend-panel'
            >
              <div className={styles.accordionTitle}>Backend</div>
            </AccordionSummary>
            <AccordionDetails>
              {/* <Link
                className={styles.menuButton}
                onClick={() => dispatch(addSelected('todosBE'))} href={''}              >
                To-do
              </Link>
              <Link
                className={styles.menuButton}
                onClick={() => dispatch(addSelected('frameworkBE'))}
              >
                Framework
              </Link>
              <Link
                className={styles.menuButton}
                onClick={() => dispatch(addSelected('model'))}
              >
                Model
              </Link> */}
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion className={styles.accordion} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
              aria-controls='frontend'
              id='frontend-panel'
            >
              <div className={styles.accordionTitle}>Frontend</div>
            </AccordionSummary>
            <AccordionDetails>
              <button
                className={styles.menuButton}
                onClick={() => dispatch(addSelected('todosFE'))}
              >
                To-do
              </button>
              <button
                className={styles.menuButton}
                onClick={() => dispatch(addSelected('frameworkFE'))}
              >
                Framework
              </button>
              <button
                className={styles.menuButton}
                onClick={() => dispatch(addSelected('colors'))}
              >
                Color Schema
              </button>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
