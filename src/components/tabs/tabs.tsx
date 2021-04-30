import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import styles from './tabs.module.scss';

export type TabsProps = {
  items: {
    label: string;
    key: string;
  }[];
  defaultTab?: number;
};

const Tabs: FC<TabsProps> = ({ items, defaultTab = 0 }) => {
  const [active, setActive] = useState<string>(items[defaultTab].label);
  return (
    <div className={styles.wrapper}>
      {items.map(({ label }) => (
        <div className={styles.tab} key={label}>
          <Tab
            value={label}
            active={active === label}
            onClick={() => setActive(label)}
          >
            {label}
          </Tab>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
