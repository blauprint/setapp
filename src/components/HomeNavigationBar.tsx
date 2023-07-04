'use client';
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
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

import {
  AiFillBuild,
  AiOutlineBuild,
  AiTwotoneBuild,
  AiTwotoneEdit,
} from 'react-icons/ai';

export default function HomeNavigationBar() {
  const router = useRouter();
  const [navbarTitle, setNavbarTitle] = useState<string>('');
  const currentProjectTitle = useAppSelector(
    (state) => state.currentProject.title,
  );
  function getNavbarTitle(): string {
    switch (router.asPath) {
      case '/projects':
        return '';
      case '/profile':
        return 'Profile';
      case '/about':
        return 'About';
      case '/contact':
        return 'Contact';
      case '/':
        return '';
      default:
        return `./${currentProjectTitle}`;
    }
  }

  const user = useUser().user;
  let userName;

  useEffect(() => {
    userName = user?.username;
  }, [user]);

  useEffect(() => {
    setNavbarTitle(getNavbarTitle());
  }, [router.asPath]);

  return (
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
          <div className={styles.projectName}>{navbarTitle}</div>
          <div>
            <Link
              className={styles.projectsLink}
              href={'/projects'}
              prefetch={true}
            >
              Projects
            </Link>
          </div>
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
  );
}
