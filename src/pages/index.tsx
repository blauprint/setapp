import Head from 'next/head';
import styles from '@/styles/HomePage.module.css';
import Typewriter from 'typewriter-effect';
import setApp from '@/assets/setApp.json';
import Lottie from 'react-lottie-player';

import {
  AiFillBuild,
  AiOutlineBuild,
  AiTwotoneBuild,
  AiTwotoneEdit,
} from 'react-icons/ai';

export default function Home() {
  return (
    <>
      <Head>
        <title>SetApp </title>
        <meta name="description" content="SetApp" />
        <meta
          name="viewport"
          content="width=device-width, 
        initial-scale=1"
        />
      </Head>
      <section className={styles.introContainer}>
        <div className={styles.heroText}>
          <div className={styles.brand}>
            <div className={styles.setApp}>
              <AiFillBuild />
              <div>SetApp</div>
            </div>
          </div>
          <div className={styles.heroSubText}>
            architects your
            <div></div>
          </div>
          <div className={styles.typewriter}>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(500)
                  .typeString('idea')
                  .pauseFor(100)
                  .deleteAll()
                  .typeString('project')
                  .pauseFor(100)
                  .deleteAll()
                  .typeString('MVP')
                  .pauseFor(3000)
                  .deleteAll()
                  .start();
              }}
            />
          </div>

          <div>
            <div className={styles.sell}>Start building now</div>
            <div className={styles.heroBtns}>
              <button className={styles.heroBtn}>Get Started</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.moreInfo}>
        <div className={styles.sectionHeading}>
          Turn your app ideas into reality with ease
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoText}>
            <p>
              Our intuitive platform guides you through the process of creating
              your very own app.
            </p>
            <p>
              Whether you're a seasoned developer or just starting out, our
              powerful tools and customizable templates will help you craft a
              stunning and functional app tailored to your unique needs.
            </p>

            <p>Start creating your dream app now.</p>
            <p>Let's make it happen together!</p>
          </div>
          <div className={styles.infoImage}>
            <Lottie
              loop
              animationData={setApp}
              play
              speed={0.6}
              className={styles.lottieSetApp}
            />
          </div>
        </div>
      </section>
      <footer className={styles.footer}>@SetApp - 2023</footer>
    </>
  );
}
