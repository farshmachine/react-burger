import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './price.module.scss';
import cn from 'classnames';

type PriceProps = {
  value: number | JSX.Element | string;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  type?: 'default' | 'large';
  currency?: boolean;
};

const Price: FC<PriceProps> = ({
  value,
  className,
  type = 'default',
  titleClassName,
  iconClassName,
  currency = true,
}) => {
  const icon = (
    <div className={iconClassName}>
      <CurrencyIcon type='primary' />
    </div>
  );

  return (
    <div className={cn(styles.wrapper, className)}>
      <p
        className={cn(
          'text',
          `text_type_digits-${type}`,
          'mr-1',
          titleClassName
        )}
      >
        {value}
      </p>
      {currency && icon}
    </div>
  );
};

export default Price;
