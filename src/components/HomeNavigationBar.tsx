import styles from "@/styles/HomeNavigationBar.module.css";
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function HomeNavigationBar() {

  const { userId } = useAuth();
  const { user } = useUser();


  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>SetApp</div>
        <div className={styles.navOptions}>
          {!userId ? (
            <SignInButton mode="modal">
              <button className={styles.loginBtn}>Login</button>
            </SignInButton>
          ) : (
            <Link href="/profile" className="user-name">
              <UserButton afterSignOutUrl="/" />
              <span>{user?.username}</span>
            </Link>
          )
          }
        </div>
      </div>
    </>
  );
}
