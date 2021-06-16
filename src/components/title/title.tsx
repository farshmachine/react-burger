import { forwardRef } from 'react';
import styles from './title.module.scss';
import cn from 'classnames';

type TitleProps = {
  children: string | JSX.Element;
  type?: 'default' | 'large' | 'medium' | 'small';
  className?: string;
  onClick?: () => void;
};

const Title = forwardRef<HTMLParagraphElement, TitleProps>(
  ({ children, type = 'default', className, onClick }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          styles.title,
          `text_type_main-${type}`,
          'text',
          className
        )}
        onClick={onClick}
      >
        {children}
      </p>
    );
  }
);

export default Title;
