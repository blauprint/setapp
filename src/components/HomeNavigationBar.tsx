import { store } from "@/redux/store";
import styles from "@/styles/HomeNavigationBar.module.css";
import { ProjectData } from "@/types/typedefs";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomeNavigationBar() {

  const router = useRouter();
  const currentRoute = router.pathname;

  let currentProjectName: string = store.getState().currentProject.projectName;


  return (
    <>

      <div className={styles.container}>

        <div className={styles.logo}>
          <Link href={"/"}>SetApp</Link>
        </div>

        {(currentProjectName && currentRoute === '/[userName]/[projectName]/output') &&
          <div className={styles.projectName}>
            <Link href={'/[userName]/[projectName]/output'}>{currentProjectName}</Link>
          </div>
        }
        {(currentRoute === '/' ||
          currentRoute === '/[userName]/[projectName]/output') &&
          <div>
            <Link href={'/projects'}>Projects</Link>
          </div>
        }
        <div className={styles.navOptions}>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl={"/projects"} afterSignUpUrl="/projects">
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
