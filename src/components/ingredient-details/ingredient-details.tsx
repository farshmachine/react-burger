import Digits from '../digits/digits';
import Title from '../title/title';
import styles from './ingredient-details.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/ingredients';

const IngredientDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const item = useAppSelector((state) =>
    state.ingredients.ingredients?.find((i) => i._id === id)
  )!;

  useEffect(() => {
    if (!item) {
      dispatch(getIngredients());
    }
  }, [dispatch, item]);

  return item ? (
    <div className={styles.wrapper}>
      <Title type='large' className={cn(styles.title, styles.heading)}>
        Детали ингридиента
      </Title>
      <div className={styles.content}>
        <img
          src={item.image_large}
          alt={item.name}
          className={cn(styles.image, 'mb-4')}
        />
        <Title type='medium' className={cn(styles.text, styles.title, 'mb-2')}>
          {item.name}
        </Title>
        <Title className={cn(styles.text, styles.title)}>
          Превосходные котлеты из марсианской Магнолии для фирменных космических
          бургеров, набирающих популярность по всей вселенной.
        </Title>
        <div className={styles.composition}>
          <div className={styles['composition-item']}>
            <Title className={styles.title}>Калории, ккал</Title>
            <Digits className={styles.text}>{item.calories}</Digits>
          </div>
          <div className={styles['composition-item']}>
            <Title className={styles.title}>Белки, г</Title>
            <Digits className={styles.text}>{item.proteins}</Digits>
          </div>
          <div className={styles['composition-item']}>
            <Title className={styles.title}>Жиры, г</Title>
            <Digits className={styles.text}>{item.fat}</Digits>
          </div>
          <div className={styles['composition-item']}>
            <Title className={styles.title}>Углеводы, г</Title>
            <Digits className={styles.text}>{item.carbohydrates}</Digits>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default IngredientDetailsPage;
