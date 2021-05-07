import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './price.module.scss';

type PriceProps = {
  value: number | JSX.Element;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  type: 'default' | 'large';
};

const Price: FC<PriceProps> = ({
  value,
  className,
  type,
  titleClassName,
  iconClassName,
}) => {
  const icon = (
    <div className={iconClassName}>
      <CurrencyIcon type='primary' />
    </div>
  );

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <p className={`text text_type_digits-${type} mr-1 ${titleClassName}`}>
        {value}
      </p>
      {icon}
    </div>
  );
};

export default Price;
