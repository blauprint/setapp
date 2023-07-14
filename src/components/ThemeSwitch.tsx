import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import styles from '@/styles/ThemeSwitch.module.css';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        className={styles.switchBtn}
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      >
        {resolvedTheme === 'dark' ? (
          <MdOutlineWbSunny size={30} />
        ) : (
          <MdDarkMode size={30} />
        )}
      </button>
    </>
  );
}
