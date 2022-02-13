import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Main from '../components/Main/Main';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Main />
      </div>
    </Provider>
  );
};

export default Home;
