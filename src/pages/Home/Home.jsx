import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.homeWelcome}>Welcome to the Random Store!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Quod, quos! Quisquam quae saepe, quidem accusamus iusto tempora quam, 
        doloremque nesciunt minus atque suscipit error nostrum possimus distinctio, 
        repudiandae sint accusantium!
      </p>
    </div>
  );
}

export default Home;