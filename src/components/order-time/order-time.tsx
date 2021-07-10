import { FC } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Title from '../title/title';

type OrderTimeProps = {
  value: string;
  className?: string;
};

export const OrderTime: FC<OrderTimeProps> = ({ value, className }) => {
  const [when, time] = moment(value).calendar().split(' в ');
  return <Title className={className}>{`${when} ${time}`}</Title>;
};
