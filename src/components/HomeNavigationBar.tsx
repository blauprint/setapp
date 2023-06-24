import styles from "@/styles/HomeNavigationBar.module.css";

export default function HomeNavigationBar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>SetApp</div>
        <div className={styles.navOptions}>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </div>
    </>
  );
}
