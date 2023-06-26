import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '@/styles/ProjectMenu.module.css'

type MenuProps = {
  onButtonClick: (componentName: string) => void
}

export default function ProjectMenu({ onButtonClick }: MenuProps) {

  function handleClick(componentName: string) {
    onButtonClick(componentName)
  }

  return (
    <>
      <div className={styles.menu}>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="backend"
            id="backend-panel">
            <div className={styles.accordionTitle}>Backend</div>
          </AccordionSummary>
          <AccordionDetails>
            <button className={styles.menuButton}>file structure</button>
            <button className={styles.menuButton}>model</button>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="frontend"
            id="frontend-panel">
            <div className={styles.accordionTitle}>Frontend</div>
          </AccordionSummary>
          <AccordionDetails>
            <button className={styles.menuButton}>file structure</button>
            <button className={styles.menuButton} onClick={() => handleClick('colorsPage')}>color schema</button>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}