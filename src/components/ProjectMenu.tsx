//WORK IN PROGRESS
//TODO: Fix links and styles
'use client'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '@/styles/ProjectMenu.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSelected } from '@/redux/selectedSlice';

export default function ProjectMenu() {
  const dispatch = useAppDispatch();
  let selected = useAppSelector((state) => state.selected);

  return (
    <>
      <div className={styles.menuContainer}>
        <a
          className={selected === 'overview' ? styles.menuButtonSelected : styles.menuButton}
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
                    className={selected === 'todosBE' ? styles.menuButtonSelected : styles.menuButton}
                    onClick={() => dispatch(addSelected('todosBE'))}
                    href='#todosBE'
                  >
                    To-do
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={selected === 'frameworkBE' ? styles.menuButtonSelected : styles.menuButton}
                    onClick={() => dispatch(addSelected('frameworkBE'))}
                    href='#frameworkBE'
                  >
                    Framework
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={selected === 'model' ? styles.menuButtonSelected : styles.menuButton}
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
                    className={selected === 'todosFE' ? styles.menuButtonSelected : styles.menuButton}
                    onClick={() => dispatch(addSelected('todosFE'))}
                  >
                    To-do
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    href='#frameworkFE'
                    className={selected === 'frameworkFE' ? styles.menuButtonSelected : styles.menuButton}
                    onClick={() => dispatch(addSelected('frameworkFE'))}
                  >
                    Framework
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    href='#colors'
                    className={selected === 'colors' ? styles.menuButtonSelected : styles.menuButton}
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
