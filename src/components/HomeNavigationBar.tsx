import { store } from '@/redux/store';
import styles from '@/styles/HomeNavigationBar.module.css';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';

import { Quicksand } from 'next/font/google';
const quicksand = Quicksand({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitch from './ThemeSwitch';

export default function HomeNavigationBar() {
  const router = useRouter();
  const currentRoute = router.pathname;

  let projectName: string = store.getState().currentProject.title;
  let userName = useUser().user?.username;

  return (
    <>
      <div className={styles.container}>
        <div
          className={quicksand.className}

          style={{
            fontSize: '28px',
            color: 'var(--text-color)',
            letterSpacing: '9px',
            fontWeight: 600,
          }}
        >
          <Link href={'/'}>setapp</Link>
        </div>

        {projectName && currentRoute === '/[userName]/[projectName]/[projectId]/output' && (
          <div className={styles.projectName}>{'./' + projectName}</div>
        )}

        <div className={styles.navOptions}>
          <SignedIn>
            {(currentRoute === '/' ||
              currentRoute === '/[userName]/[projectName]/[projectId]/output' ||
              currentRoute === '/idea') && (
                <div>
                  <Link className={styles.projectlink} href={'/projects'}>
                    Projects
                  </Link>
                </div>
              )}
          </SignedIn>
          <ThemeSwitch />
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl={'/projects'}
              afterSignUpUrl="/projects"
            >
              <button className={styles.loginBtn}>Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/profile" className="user-name">
              <UserButton afterSignOutUrl="/" />
            </Link>
          </SignedIn>
        </div>
      </div>
    </>
  );
}
