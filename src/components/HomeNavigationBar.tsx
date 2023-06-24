import styles from "@/styles/HomeNavigationBar.module.css";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
export default function HomeNavigationBar() {

  const { userId, sessionId } = useAuth();
  const { user } = useUser();


  function handleLogin() {
    return `/projects`
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>SetApp</div>
        <div className={styles.navOptions}>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl={handleLogin()}>
              <button className={styles.loginBtn} >Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/profile" className="user-name">
              <UserButton afterSignOutUrl="/" />
              <span>{user?.username}</span>
            </Link>
          </SignedIn>

        </div>
      </div>
    </>
  );
}
