import {
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.scss';

export const ProfileForm = () => {
  return (
    <form className={styles.form}>
      <Input
        type={'text'}
        value=''
        placeholder={'Имя'}
        onChange={(e) => {}}
        icon={'EditIcon'}
        name={'name'}
        size={'default'}
      />
      <EmailInput value={'test@test.ru'} name='email' onChange={() => {}} />
      <Input
        type={'password'}
        value='test'
        placeholder={'Пароль'}
        onChange={(e) => {}}
        icon={'EditIcon'}
        name={'password'}
        size={'default'}
      />
    </form>
  );
};
