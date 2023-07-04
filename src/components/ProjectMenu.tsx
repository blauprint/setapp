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
      <div className={styles.menuContainer}>
        {/* <Link
          className={styles.menuButton}
          onClick={() => dispatch(addSelected('overview'))}
          // shallow={true}
          href={{
            pathname: `/${userName}/${projectId}/`,
            query: {
              id: 'overview',
            },
          }}
        >
          Overview
        </Link> */}
        <a
          className={styles.menuButton}
          onClick={() => dispatch(addSelected('overview'))}
          href='#overview'
        >
          Overview
        </a>
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
              <ul>
                <li className={styles.listItem}>
                  <a
                    className={styles.menuButton}
                    onClick={() => dispatch(addSelected('todosBE'))}
                    href='#todosBE'
                  >
                    To-do
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.menuButton}
                    onClick={() => dispatch(addSelected('frameworkBE'))}
                    href='#frameworkBE'
                  >
                    Framework
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.menuButton}
                    onClick={() => dispatch(addSelected('model'))}
                    href='#model'
                  >
                    Model
                  </a>
                </li>
              </ul>
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
              <ul>
                <li className={styles.listItem}>
                  <a
                    href='#todosFE'
                    className={styles.menuButton}
                    onClick={() => dispatch(addSelected('todosFE'))}
                  >
                    To-do
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    href='#frameworkFE'
                    className={styles.menuButton}
                    onClick={() => dispatch(addSelected('frameworkFE'))}
                  >
                    Framework
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    href='#colors'
                    className={styles.menuButton}
                    onClick={() => dispatch(addSelected('colors'))}
                  >
                    Color Schema
                  </a>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
