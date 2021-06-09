import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import Title from '../../components/title/title';
import styles from './login.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from '../../components/button/button';

type LoginProps = {};

export const LoginPage: FC<LoginProps> = () => {
  return (
    <div className={styles.wrapper}>
      <Title className={cn(styles.title, 'mb-6')}>Вход</Title>
      <form className={styles.form}>
        <div className='mb-6'>
          <EmailInput
            name='email'
            value=''
            size='default'
            onChange={() => {}}
          />
        </div>
        <div className='mb-6'>
          <PasswordInput
            name='password'
            value=''
            size='default'
            onChange={() => {}}
          />
        </div>
        <div className={styles.button}>
          <Button type='submit'>Войти</Button>
        </div>
        <Title className={styles.text}>
          <div>
            Вы новый пользователь?{' '}
            <Link to='/register' className={styles.link}>
              Зарегистрироваться
            </Link>
          </div>
        </Title>
        <Title className={styles.text}>
          <div>
            Забыли пароль?{' '}
            <Link to='/forgot-password' className={styles.link}>
              Восстановить пароль
            </Link>
          </div>
        </Title>
      </form>
    </div>
  );
};
