import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import Title from '../../components/title/title';
import styles from './login.module.scss';
import cn from 'classnames';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { useFormik } from 'formik';
import { login, refreshToken } from '../../services/user/user';
import { useUser } from '../../hooks/useUser';
import { FormError } from '../../components/form-error/form-error';
import { LocationState } from '../../types/location';
import { PasswordInput } from '../../components/password-input/password-input';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type LoginProps = {};

export const LoginPage: FC<LoginProps> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: '/' } };
  const { loading, error, tokenUpdateDate, isTokenUpdated, hasToken } =
    useUser();

  useEffect(() => {
    if (!isTokenUpdated && hasToken) {
      dispatch(refreshToken());
    }
  }, []);

  const {
    handleSubmit,
    handleChange,
    values: { password, email },
  } = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  if (tokenUpdateDate && isTokenUpdated) {
    return <Redirect to={from} />;
  }

  return (
    <div className={styles.wrapper}>
      <Title className={cn(styles.title, 'mb-6')}>Вход</Title>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <FormError text={error} />
        <div className={styles.button}>
          <Button type='submit' disabled={loading}>
            {loading ? 'Ожидайте...' : 'Войти'}
          </Button>
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
