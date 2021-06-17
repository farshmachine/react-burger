import {
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useUser } from '../../hooks/useUser';
import { getUser, updateInfo } from '../../services/user/user';
import { Button } from '../button/button';
import styles from './profile-form.module.scss';

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user: username, email: mail, loading } = useUser();

  const {
    handleSubmit,
    handleChange,
    handleReset,
    resetForm,
    values: { name, password, email },
    dirty,
  } = useFormik({
    initialValues: {
      name: username,
      password: '',
      email: mail,
    },
    onSubmit: (values) => {
      dispatch(updateInfo(values));
    },
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (username && mail) {
      resetForm({ values: { name: username, email: mail, password: '' } });
    }
  }, [username, mail, resetForm]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={'text'}
        value={name}
        placeholder={'Имя'}
        onChange={handleChange}
        icon={'EditIcon'}
        name={'name'}
        size={'default'}
      />
      <EmailInput value={email} name='email' onChange={handleChange} />
      <Input
        type={'password'}
        value={password}
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={'EditIcon'}
        name={'password'}
        size={'default'}
      />
      {dirty && (
        <div>
          <Button type='submit' disabled={loading}>
            {loading ? 'Ожидайте...' : 'Сохранить'}
          </Button>
          <Button
            kind='ghost'
            onClick={handleReset as () => void}
            disabled={loading}
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};
