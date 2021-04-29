import { mockData } from '../../utils/data';
import BurgerConstructor from '../burger-contructor/burger-contructor';
import BurgerIngredients from '../burger-ingredients/burger-inrgedients';
import Title from '../title/title';
import styles from './main.module.scss';

const Main = () => {
  const data = mockData();

  const title = (
    <Title type='large' className={`mb-3 mt-3 ${styles.title}`}>
      Соберите бургер
    </Title>
  );

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <BurgerIngredients data={data} title={title} />
        <BurgerConstructor data={data} />
      </div>
    </main>
  );
};

export default Main;
