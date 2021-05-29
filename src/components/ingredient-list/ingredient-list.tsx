import { FC } from 'react';
import { Ingredient, IngredientType } from '../../types/ingredients';
import IngredientCard from '../ingredient-card/ingredient-card';
import Title from '../title/title';
import styles from './ingredient-list.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useIngredientDataValidation } from '../../hooks/useIngredientDataValidation';
import ErrorIndicator from '../error-indicator/error-indicator';

type IngredientListProps = {
  title: string;
  tab: IngredientType;
};

const IngredientList: FC<IngredientListProps> = ({ title, tab }) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const status = useIngredientDataValidation(ingredients);

  const byType = (el: Ingredient) => el.type === tab;
  const ingredientCart = (el: Ingredient) => (
    <IngredientCard item={el} key={el._id} />
  );

  if (!status?.valid) {
    return <ErrorIndicator error={'Ошибка в модели полученных данных'} />;
  }

  return (
    <ul className={styles.wrapper} id={tab}>
      <Title type='medium' className='mb-4'>
        {title}
      </Title>
      <div className={cn(styles.container, 'pl-2 pr-2 pb-1')}>
        {ingredients?.filter(byType).map(ingredientCart)}
      </div>
    </ul>
  );
};

export default IngredientList;
