import { FC } from 'react';

type ErrorIndicatorProps = {
  error: string;
};

const ErrorIndicator: FC<ErrorIndicatorProps> = ({ error }) => {
  return (
    <div>{`Произошла ошибка: ${error}. попробуйте перезагрузить страницу`}</div>
  );
};

export default ErrorIndicator;
