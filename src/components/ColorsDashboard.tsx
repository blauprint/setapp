import ColorCard from './ColorCard';
import styles from '@/styles/ColorsDashboard.module.css';
import { ColorScheme, Color } from '@/types/typedefs';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function ColorsDashboard({
  colorScheme,
}: {
  colorScheme: ColorScheme;
}) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('Copied to clipboard!');
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let color = e.currentTarget.innerText;
    navigator.clipboard.writeText(color);
    setAlert(`Color ${color} copied to clipboard!`);
    setOpen(true);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className={styles.whyGoodOption}>
        <h2>Why should I choose this color scheme for my app?</h2>
        <p>{colorScheme.whyGoodOption}</p>
      </div>
      <div className={styles.colorPalette}>
        <ul className={styles.colorsList}>
          {colorScheme.colorPalette.colors.map((c: Color) => (
            <li key={crypto.randomUUID()}>
              <ColorCard color={c} handleClick={handleClick} />
            </li>
          ))}
        </ul>
      </div>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert severity='success' sx={{ width: '100', marginLeft: '50vw' }}>
          {alert}
        </Alert>
      </Snackbar>
    </>
  );
}
