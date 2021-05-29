import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import { IngredientType } from '../../types/ingredients';
import styles from './tabs.module.scss';
import Scrollspy from 'react-scrollspy';

export type TabItem = {
  label: string;
  key: IngredientType;
};

export type TabsProps = {
  items: TabItem[];
  defaultTab?: number;
};

const Tabs: FC<TabsProps> = ({ items, defaultTab = 0 }) => {
  const [active, setActive] = useState('bun');
  return (
    <div className={styles.wrapper}>
      <Scrollspy
        items={items.map((el) => el.key)}
        currentClassName=''
        onUpdate={(e: HTMLElement) => setActive(e.id)}
        rootEl={'.scrollspy'}
        className={styles.container}
      >
        {items.map(({ label, key }) => (
          <div className={styles.tab} key={label}>
            <a href={`#${key}`}>
              <Tab value={label} active={active === key} onClick={() => {}}>
                {label}
              </Tab>
            </a>
          </div>
        ))}
      </Scrollspy>
    </div>
  );
};

export default Tabs;
