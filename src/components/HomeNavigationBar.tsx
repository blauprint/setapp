import styles from "@/styles/HomeNavigationBar.module.css";
import { SignInButton } from "@clerk/nextjs";

export default function HomeNavigationBar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>SetApp</div>
        <div className={styles.navOptions}>
          <SignInButton mode="modal">
            <button className={styles.loginBtn}>Login</button>
          </SignInButton>
        </div>
      </div>
    </>
  );
}
