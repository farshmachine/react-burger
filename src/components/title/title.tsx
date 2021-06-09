import { forwardRef } from 'react';
import styles from './title.module.scss';
import cn from 'classnames';

type TitleProps = {
  children: string | JSX.Element;
  type?: 'default' | 'large' | 'medium' | 'small';
  className?: string;
};

const Title = forwardRef<HTMLParagraphElement, TitleProps>(
  ({ children, type = 'default', className }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          styles.title,
          `text_type_main-${type}`,
          'text',
          className
        )}
      >
        {children}
      </p>
    );
  }
);

export default Title;
