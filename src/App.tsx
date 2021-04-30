import { Header } from './components/header/header';
import Main from './components/main/main';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
    </div>
  );
};

export default App;
