import { FC } from 'react';
import styles from './form-error.module.scss';

type FormErrorProps = {
  text: string;
};

export const FormError: FC<FormErrorProps> = ({ text }) => {
  return <span className={styles.error}>{text}</span>;
};
