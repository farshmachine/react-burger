import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import Title from '../../components/title/title';
import styles from '../login/login.module.scss';
import cn from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button } from '../../components/button/button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { passwordResetRequest } from '../../services/user/user';

type ForgotPwdPageProps = {};

export const ForgotPwdPage: FC<ForgotPwdPageProps> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    handleSubmit,
    handleChange,
    values: { email },
  } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      dispatch(passwordResetRequest(values)).then((success) => {
        if (success) {
          history.replace('/reset-password');
        }
      });
    },
  });

  return (
    <div className={styles.wrapper}>
      <Title className={cn(styles.title, 'mb-6')}>Восстановление пароля</Title>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className='mb-6'>
          <EmailInput
            value={email}
            name='email'
            size='default'
            onChange={handleChange}
          />
        </div>

        <div className={styles.button}>
          <Button type='submit'>Восстановить</Button>
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
