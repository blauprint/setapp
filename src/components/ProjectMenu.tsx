import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "@/styles/ProjectMenu.module.css";

type MenuProps = {
  onButtonClick: (componentName: string) => void;
};

export default function ProjectMenu({ onButtonClick }: MenuProps) {

  function handleClick(componentName: string) {
    onButtonClick(componentName);
  }

  return (
    <>
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={() => handleClick("")}>Start</button>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            sx={{
              color: "var(--text-color)",
              bgcolor: "var(--surface-color)",
              border: "none !important",
              boxShadow: "none !important",
            }}
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  fill: "var(--text-color)",
                }}
              />
            }
            aria-controls="backend"
            id="backend-panel"
          >
            <div className={styles.accordionTitle}>Backend</div>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              bgcolor: "var(--surface-color)",
            }}
          >
            <button className={styles.menuButton} onClick={() => handleClick("todosBE")}>To-do</button>
            <button className={styles.menuButton} onClick={() => handleClick("frameworkBE")}>Framework</button>
            <button className={styles.menuButton} onClick={() => handleClick("model")}>Model</button>
          </AccordionDetails>
        </Accordion>

        <Accordion className={styles.accordion}>
          <AccordionSummary
            sx={{
              color: "var(--text-color)",
              bgcolor: "var(--surface-color)",
              border: "none !important",
              boxShadow: "none !important",
            }}
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  fill: "var(--text-color)",
                }}
              />
            }
            aria-controls="frontend"
            id="frontend-panel"
          >
            <div className={styles.accordionTitle}>Frontend</div>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              bgcolor: "var(--surface-color)",
            }}
          >
            <button className={styles.menuButton} onClick={() => handleClick("todosFE")}>To-do</button>
            <button className={styles.menuButton} onClick={() => handleClick("frameworkFE")}>Framework</button>
            <button className={styles.menuButton} onClick={() => handleClick("colors")}>Color Schema</button>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
