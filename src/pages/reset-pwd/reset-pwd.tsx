import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import Title from '../../components/title/title';
import styles from '../login/login.module.scss';
import cn from 'classnames';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button } from '../../components/button/button';
import { useUser } from '../../hooks/useUser';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { passwordReset } from '../../services/user/user';

type ResetPwdPageProps = {};

export const ResetPwdPage: FC<ResetPwdPageProps> = () => {
  const { passwordResetRequested } = useUser();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    handleSubmit,
    handleChange,
    values: { password, token },
  } = useFormik({
    initialValues: {
      password: '',
      token: '',
    },
    onSubmit: (values) => {
      dispatch(passwordReset(values)).then((success) => {
        if (success) {
          history.replace('/');
        }
      });
    },
  });

  if (!passwordResetRequested) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={styles.wrapper}>
      <Title className={cn(styles.title, 'mb-6')}>Восстановление пароля</Title>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className='mb-6'>
          <PasswordInput
            name='password'
            value={password}
            size='default'
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <Input
            name='token'
            value={token}
            onChange={handleChange}
            placeholder='Введите код из письма'
          />
        </div>

        <div className={styles.button}>
          <Button type='submit'>Сохранить</Button>
        </div>
        <Title className={styles.text}>
          <div>
            Вспомнили пароль?{' '}
            <Link to='/login' className={styles.link}>
              Войти
            </Link>
          </div>
        </Title>
      </form>
    </div>
  );
};
