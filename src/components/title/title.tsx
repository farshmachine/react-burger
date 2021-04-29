import { FC } from 'react';
import styles from './title.module.scss';

type TitleProps = {
  children: string | JSX.Element;
  type: 'default' | 'large' | 'medium' | 'default' | 'small';
  className?: string;
};

const Title: FC<TitleProps> = ({ children, type, className }) => {
  return (
    <p className={`text text_type_main-${type} ${className} ${styles.title}`}>
      {children}
    </p>
  );
};

export default Title;
