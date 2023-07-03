import Head from 'next/head';
import styles from '@/styles/HomePage.module.css';
import Typewriter from 'typewriter-effect';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import setApp from '@/assets/setApp.json';
import { useRef } from 'react';

export default function Home() {
  const animationRef = useRef<LottieRefCurrentProps>(null);
  return (
    <>
      <Head>
        <title>SetApp ⚙️ </title>
        <meta name="description" content="SetApp" />
        <meta
          name="viewport"
          content="width=device-width, 
        initial-scale=1"
        />
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      </Head>
      <section className={styles.introContainer}>
        <div className={styles.heroText}>
          <div>
            <span className={styles.setApp}>SetApp ⚙️ </span> builds
          </div>
          <div className={styles.heroSubText}>
            your
            <div className={styles.typewriter}>
              <Typewriter
                options={{
                  strings: ['idea', 'project', 'mvp'],
                  autoStart: true,
                  loop: true,
                }}
                onInit={(typewriter) => {
                  typewriter.pauseFor(2500).deleteAll().start();
                }}
              />
            </div>
          </div>
          <div>
            <div className={styles.sell}>Start buidling now</div>
            <div className={styles.heroBtns}>
              <button className={styles.heroBtn}>Login</button>
              <button className={styles.heroBtn}>Signup</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.moreInfo}>
        <p>
          Turn your app ideas into reality with ease. Our intuitive platform
          empowers you to bring your vision to life by guiding you through the
          process of creating your very own app. Whether you're a seasoned
          developer or just starting out, our powerful tools and customizable
          templates will help you craft a stunning and functional app tailored
          to your unique needs. Start creating your dream app now. Let's make it
          happen together!
        </p>
      </section>
    </>
  );
}
