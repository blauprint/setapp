import { store } from "@/redux/store";
import styles from "@/styles/HomeNavigationBar.module.css";
import { ProjectData } from "@/types/typedefs";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Quicksand } from "next/font/google";
const trainOne = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

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
        <div
          className={trainOne.className}
          style={{
            fontSize: "28px",
            color: "#fff",
            letterSpacing: "9px",
            fontWeight: 600,
          }}
        >
          <Link href={"/"}>setapp</Link>
        </div>

        {currentProjectName &&
          currentRoute === "/[userName]/[projectName]/output" && (
            <div className={styles.projectName}>
              <Link href={"/[userName]/[projectName]/output"}>
                {currentProjectName}
              </Link>
            </div>
          )}

        <div className={styles.navOptions}>
          <SignedIn>
            {(currentRoute === "/" ||
              currentRoute === "/[userName]/[projectName]/output") && (
              <div>
                <Link className={styles.projectlink} href={"/projects"}>
                  Projects
                </Link>
              </div>
            )}
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl={"/projects"}
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
