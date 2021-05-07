import { FC } from 'react';
import cn from 'classnames';

type DigitsProps = {
  children: string | number;
  type?: 'default' | 'meduim' | 'large';
  className?: string;
};

const Digits: FC<DigitsProps> = ({ children, className, type = 'default' }) => {
  return (
    <p className={cn('text', `text_type_digits-${type}`, className)}>
      {children}
    </p>
  );
};

export default Digits;
