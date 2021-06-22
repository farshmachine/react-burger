import {
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import Title from '../../components/title/title';
import styles from '../login/login.module.scss';
import cn from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { useFormik } from 'formik';
import { PasswordInput } from '../../components/password-input/password-input';
import { useDispatch } from 'react-redux';
import { refreshToken, register } from '../../services/user/user';
import { FormError } from '../../components/form-error/form-error';
import { useUser } from '../../hooks/useUser';

type RegisterProps = {};

export const RegisterPage: FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const { loading, error, tokenUpdateDate, isTokenUpdated, hasToken } =
    useUser();

  const {
    handleSubmit,
    handleChange,
    values: { name, password, email },
  } = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
    },
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  useEffect(() => {
    if (!isTokenUpdated && hasToken) {
      dispatch(refreshToken());
    }
  }, []);

  if (tokenUpdateDate && isTokenUpdated) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={styles.wrapper}>
      <Title className={cn(styles.title, 'mb-6')}>Регистрация</Title>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className='mb-6'>
          <Input
            name='name'
            value={name}
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
            onChange={handleChange}
          />
        </div>
        {error && <FormError text={error} />}
        <div className={styles.button}>
          <Button type='submit' disabled={loading}>
            {loading ? 'Ожидайте...' : 'Зарегистрироваться'}
          </Button>
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
