import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import Title from '../../components/title/title';
import styles from '../login/login.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { useFormik } from 'formik';

type RegisterProps = {};

export const RegisterPage: FC<RegisterProps> = () => {
  const {
    handleSubmit,
    handleChange,
    values: { username, password, email },
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
    },
    onSubmit: (values) => {
      // TODO Добавить логику создания юзера
      // api.createUser(values).then((data) => {
      //   console.log(`data`, data);
      // });
    },
  });
  return (
    <div className={styles.wrapper}>
      <Title className={cn(styles.title, 'mb-6')}>Регистрация</Title>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className='mb-6'>
          <Input
            name='username'
            value={username}
            size='default'
            onChange={handleChange}
            placeholder='Имя'
          />
        </div>
        <div className='mb-6'>
          <EmailInput
            name='email'
            value={email}
            size='default'
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <PasswordInput
            name='password'
            value={password}
            size='default'
            onChange={handleChange}
          />
        </div>
        <div className={styles.button}>
          <Button type='submit'>Зарегистрироваться</Button>
        </div>
        <Title className={styles.text}>
          <div>
            Уже зарегистрированы?{' '}
            <Link to='/login' className={styles.link}>
              Войти
            </Link>
          </div>
        </Title>
      </form>
    </div>
  );
};
