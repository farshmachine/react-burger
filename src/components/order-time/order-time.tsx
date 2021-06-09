import { FC } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Title from '../title/title';

const ruLocale = moment().locale('ru');

type OrderTimeProps = {
  value: number;
  className?: string;
};

export const OrderTime: FC<OrderTimeProps> = ({ value, className }) => {
  const [when, time] = ruLocale.calendar(value).split(' в ');
  return <Title className={className}>{`${when} ${time}`}</Title>;
};
