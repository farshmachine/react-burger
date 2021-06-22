import { FC, ReactElement } from 'react';
import cn from 'classnames';
import styles from './button.module.scss';
import Title from '../title/title';

type ButtonProps = {
  kind?: 'primary' | 'ghost';
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  children: string | ReactElement;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  type = 'button',
  className = '',
  children,
  onClick,
  disabled,
  kind = 'primary',
}) => {
  return (
    <button
      type={type}
      className={cn(styles.button, className, styles[kind])}
      onClick={onClick}
      disabled={disabled}
    >
      <Title>{children}</Title>
    </button>
  );
};
