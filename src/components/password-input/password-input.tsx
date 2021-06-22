import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, FC, ChangeEvent } from 'react';

type PasswordInputPorps = {
  name?: string;
  placehlder?: string;
  size?: 'default' | 'small';
  value: string;
  onChange: (e: string | ChangeEvent<any>) => void;
};

export const PasswordInput: FC<PasswordInputPorps> = ({
  value,
  onChange,
  name = 'password',
  placehlder = 'Пароль',
  size = 'default',
}) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    setVisible(!visible);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <Input
      ref={inputRef}
      type={visible ? 'text' : 'password'}
      name={name}
      placeholder={placehlder}
      icon={visible ? 'HideIcon' : 'ShowIcon'}
      value={value}
      size={size}
      onChange={onChange}
      onIconClick={handleIconClick}
    />
  );
};
