'use client';
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

import {
  AiFillBuild,
  AiOutlineBuild,
  AiTwotoneBuild,
  AiTwotoneEdit,
} from 'react-icons/ai';


export default function HomeNavigationBar() {
  const router = useRouter();
  const currentRoute = router.pathname;

  let projectName: string = store.getState().currentProject.title;
  const user = useUser().user;
  let userName;
  console.log('userName: ', userName);

  useEffect(() => {
    userName = user?.username;
  }, [user]);

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
          <Link
            href={'/'}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <AiFillBuild />
            setapp
          </Link>
        </div>


        <div className={styles.navOptions}>
          <SignedIn>
        {projectName && (
          <div className={styles.projectName}>{'./' + projectName}</div>
        )}
            {
              <div>
                <Link className={styles.projectlink} href={'/projects'}>
                  Projects
                </Link>
              </div>
            }
          </SignedIn>
          <ThemeSwitch />
          <SignedOut>
            <SignInButton
              mode='modal'
              afterSignInUrl='/projects'
              afterSignUpUrl='/projects'
            >
              <button className={styles.loginBtn}>Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href='/profile'>
              <div className={styles.userName}>{userName}</div>
              <UserButton afterSignOutUrl='/' />
            </Link>
          </SignedIn>
        </div>
      </div>
    </>
  );
}
