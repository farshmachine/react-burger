import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useContext } from 'react';
import Title from '../../components/title/title';
import styles from '../login/login.module.scss';
import cn from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button } from '../../components/button/button';
import { ApiContext } from '../../contexts/api-context';

type ResetPwdPageProps = {};

export const ResetPwdPage: FC<ResetPwdPageProps> = () => {
  const api = useContext(ApiContext);
  const history = useHistory();

  const {
    handleSubmit,
    handleChange,
    values: { password, code },
  } = useFormik({
    initialValues: {
      password: '',
      code: '',
    },
    onSubmit: (values) => {
      api.resetPassword(values).then(({ success }) => {
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
          <PasswordInput
            name='password'
            value={password}
            size='default'
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <Input
            name='code'
            value={code}
            onChange={handleChange}
            placeholder='Введите код из письма'
          />
        </div>

        <div className={styles.button}>
          <Button onClick={handleSubmit}>Сохранить</Button>
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
