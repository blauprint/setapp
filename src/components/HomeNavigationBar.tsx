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

const quicksand = Quicksand({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitch from './ThemeSwitch';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  AiFillBuild,
  AiOutlineBuild,
  AiTwotoneBuild,
  AiTwotoneEdit,
} from 'react-icons/ai';
import { ProjectData } from '@/types/typedefs';
import { RootState } from '@/redux/store';
import { Auth } from '@/types/Auth';
import { updateProjectTitle } from '@/services/projectsService';
import { changeTitle } from '@/redux/currentProjectSlice';


export default function HomeNavigationBar() {

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

  const currentProject: ProjectData = useAppSelector((state: RootState) => state.currentProject)
  const currentProjectTitle = currentProject.title;
  let newTitle = currentProjectTitle;
  // let [title, setTitle] = useState(currentProjectTitle);
  let dispatch = useAppDispatch();

  const user = useUser().user;
  let userName;

  useEffect(() => {
    userName = user?.username;
  }, [user]);

  function handleTitleChange(e: React.KeyboardEvent<HTMLDivElement>) {
    // newTitle = e.target.textContent || '';
    // setTitle(newTitle);
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }

  async function handleTitleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (auth) {
      newTitle = e.target.textContent || '';
      // setTitle(newTitle);

      let titleObject = { title: newTitle };
      updateProjectTitle(auth, currentProject.id, titleObject).then(res => res);
      dispatch(changeTitle(newTitle));
    }
  }

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

            {router.query.userName &&
              <div className={styles.projectName} contentEditable="true" suppressContentEditableWarning={true} onKeyDown={handleTitleChange} onBlur={handleTitleBlur}>{currentProjectTitle}</div>}
            <div>
              <Link className={styles.projectsLink} href={'/projects'}>
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
    </>
  );
}
