import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeColumn}>
        <div className={styles.homeBckImg1}></div>
      </div>
      <div className={styles.homeColumn}>
        <div className={styles.homeBckImg2}></div>
      </div>
      <div className={styles.homeColumn}>
        <div className={styles.homeBckImg3}></div>
      </div>
      <div className={styles.homeColumn}>
        <div className={styles.homeBckImg4}></div>
      </div>
      <div className={styles.homeText}>
        <h1 className={styles.homeWelcome}>Welcome!</h1>
        <p className={styles.homeParagraph}>Please take your time exploring our carefully curated selection of products.<br /> There are 20 of them, if you can believe it!
        </p>
      </div>
    </div>
  );
}

export default Home;