import { FC, ReactElement } from 'react';
import cn from 'classnames';
import styles from './button.module.scss';
import Title from '../title/title';

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  children: string | ReactElement;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  type = 'button',
  className = '',
  children,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={cn(styles.button, className)}
      onClick={onClick}
    >
      <Title className={styles.title}>{children}</Title>
    </button>
  );
};
