'use client';
import styles from '@/styles/HomeNavigationBar.module.css';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from '@clerk/nextjs';
import { Quicksand } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitch from './ThemeSwitch';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { AiFillBuild } from 'react-icons/ai';
import { ProjectData } from '@/types/typedefs';
import { RootState } from '@/redux/store';
import { Auth } from '@/types/Auth';
import { updateProjectTitle } from '@/services/projectsService';
import { changeTitle } from '@/redux/currentProjectSlice';

const quicksand = Quicksand({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function HomeNavigationBar() {
  const [content, setContent] = useState('');
  const router = useRouter();
  const {
    userId,
    sessionId,
    isLoaded,
    getToken,
    isSignedIn,
    signOut,
    orgId,
    orgRole,
    orgSlug,
  } = useAuth();

  const auth: Auth = {
    userId: userId?.toString(),
    sessionId: sessionId?.toString(),
    sessionToken: getToken,
    isLoaded: isLoaded,
    isSignedIn: isSignedIn,
    signOut: signOut,
    orgId: orgId?.toString(),
    orgRole: orgRole?.toString(),
    orgSlug: orgSlug?.toString(),
  };

  const currentProject: ProjectData = useAppSelector(
    (state: RootState) => state.currentProject,
  );
  const currentProjectTitle = currentProject.title;
  let newTitle = currentProjectTitle;
  let dispatch = useAppDispatch();

  const user = useUser().user;
  let userName;

  useEffect(() => {
    userName = user?.username;
  }, [user]);

  function handleTitleChange(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  const maxLength = 40;
  const handleInput = (event: any) => {
    const text = event.target.innerText;
    if (text.length <= maxLength) {
      setContent(text);
    } else {
      event.target.innerText = content;
    }
  };


  async function handleTitleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (auth) {
      newTitle = e.target.textContent || '';
      const updatedProject = { ...currentProject };
      updatedProject.title = newTitle;
      updateProjectTitle(auth, currentProject.id, updatedProject)
        .then((res) => res)
        .catch((error) => {
          console.log(error);
          throw new Error(`Error updating project title: ${newTitle}`);
        });
      dispatch(changeTitle(newTitle));
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoAndName}>
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
          <div className={styles.projectTitleDisplay}>
            <SignedIn>
              {router.query.userName && (
                <div
                  className={styles.projectName}
                  contentEditable='true'
                  onInput={handleInput}
                  suppressContentEditableWarning={true}
                  onKeyDown={handleTitleChange}
                  onBlur={handleTitleBlur}
                >
                  {currentProjectTitle}
                </div>
              )}
            </SignedIn>
          </div>
        </div>

        <div className={styles.navOptions}>
          <SignedIn>
            <ul className={styles.navLinks}>
              <li>
                <Link className={styles.projectsLink} href={'/idea'}>
                  + New
                </Link>
              </li>
              <li>
                <Link className={styles.projectsLink} href={'/projects'}>
                  Projects
                </Link>
              </li>
            </ul>
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
