import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "@/styles/ProjectMenu.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { addSelected } from "@/redux/selectedSlice";

export default function ProjectMenu() {

  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={() => dispatch(addSelected(""))}>Start</button>
        <div>
          <Accordion className={styles.accordion} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
              aria-controls="backend"
              id="backend-panel"
            >
              <div className={styles.accordionTitle}>Backend</div>
              <div className={styles.accordionTitle}>Backend</div>
            </AccordionSummary>
            <AccordionDetails>
              <button className={styles.menuButton} onClick={() => dispatch(addSelected("todosBE"))}>To-do</button>
              <button className={styles.menuButton} onClick={() => dispatch(addSelected("frameworkBE"))}>Framework</button>
              <button className={styles.menuButton} onClick={() => dispatch(addSelected("model"))}>Model</button>
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion className={styles.accordion} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
              aria-controls="frontend"
              id="frontend-panel"
            >
              <div className={styles.accordionTitle}>Frontend</div>
              <div className={styles.accordionTitle}>Frontend</div>
            </AccordionSummary>
            <AccordionDetails>
              <button className={styles.menuButton} onClick={() => dispatch(addSelected("todosFE"))}>To-do</button>
              <button className={styles.menuButton} onClick={() => dispatch(addSelected("frameworkFE"))}>Framework</button>
              <button className={styles.menuButton} onClick={() => dispatch(addSelected("colors"))}>Color Schema</button>
            </AccordionDetails>
          </Accordion>
        </div>
      </div >
    </>
  );
}
