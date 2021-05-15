import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './price.module.scss';
import cn from 'classnames';

type PriceProps = {
  value: number | JSX.Element;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  type?: 'default' | 'large';
};

const Price: FC<PriceProps> = ({
  value,
  className,
  type = 'default',
  titleClassName,
  iconClassName,
}) => {
  const icon = (
    <div className={iconClassName}>
      <CurrencyIcon type='primary' />
    </div>
  );

  return (
    <div className={cn(styles.wrapper, className)}>
      <p
        className={cn('text text_type mr-1', `digits-${type}`, titleClassName)}
      >
        {value}
      </p>
      {icon}
    </div>
  );
};

export default Price;
