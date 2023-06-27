import styles from "@/styles/HomeNavigationBar.module.css";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import Link from "next/link";

export default function HomeNavigationBar() {
  return (
    <>
      
      <div className={styles.container}>
        
        <div className={styles.logo}>
          <Link href={"/projects"}>SetApp</Link>
        </div>

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
