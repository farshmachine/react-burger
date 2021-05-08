import { FC } from 'react';
import { IngredientType } from '../../types/ingredients';
import Digits from '../digits/digits';
import { ModalComponentProps } from '../modal-provider/modal-provider';
import Modal from '../modal/modal';
import Title from '../title/title';
import styles from './ingredient-details.module.scss';
import cn from 'classnames';

export type IngredientDetailsProps = {
  item: IngredientType;
};

const IngredientDetails: FC<ModalComponentProps<'ingredientDetails'>> = ({
  isOpened,
  handleClose,
  item: { name, image_large, calories, proteins, fat, carbohydrates },
}) => {
  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.wrapper}>
        <Title type='large' className={cn(styles.title, styles.heading)}>
          Детали ингридиента
        </Title>
        <div className={styles.content}>
          <img
            src={image_large}
            alt={name}
            className={cn(styles.image, 'mb-4')}
          />
          <Title
            type='medium'
            className={cn(styles.text, styles.title, 'mb-2')}
          >
            {name}
          </Title>
          <Title className={cn(styles.text, styles.title)}>
            Превосходные котлеты из марсианской Магнолии для фирменных
            космических бургеров, набирающих популярность по всей вселенной.
          </Title>
          <div className={styles.composition}>
            <div className={styles['composition-item']}>
              <Title className={styles.title}>Калории, ккал</Title>
              <Digits className={styles.text}>{calories}</Digits>
            </div>
            <div className={styles['composition-item']}>
              <Title className={styles.title}>Белки, г</Title>
              <Digits className={styles.text}>{proteins}</Digits>
            </div>
            <div className={styles['composition-item']}>
              <Title className={styles.title}>Жиры, г</Title>
              <Digits className={styles.text}>{fat}</Digits>
            </div>
            <div className={styles['composition-item']}>
              <Title className={styles.title}>Углеводы, г</Title>
              <Digits className={styles.text}>{carbohydrates}</Digits>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IngredientDetails;
