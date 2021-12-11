import type { NextPage } from 'next';
import Main from '../components/Main/Main';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Main />
    </div>
  );
};

export default Home;
