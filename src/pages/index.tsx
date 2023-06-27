import Head from "next/head";
import styles from '@/styles/HomePage.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>⚙️ SetApp</title>
        <meta name="description" content="SetApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.introContainer}>
        <h2>Welcome to <span className="appName">setapp</span>!</h2>

        <p>Turn your app ideas into reality with ease. Our intuitive platform empowers you to bring your vision to life
          by guiding you through the process of creating your very own app. Whether you're a seasoned developer or just
          starting out, our powerful tools and customizable templates will help you craft a stunning and functional app
          tailored to your unique needs.</p>

        <h3>Start creating your dream app now. Let's make it happen together!</h3>
      </div>
    </>
  );
}
