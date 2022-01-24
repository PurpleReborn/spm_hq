import { TabButton } from 'components/atoms';

import styles from './styles.module.scss';

const { root } = styles;

const TabsGroup = (props) => {
  const { selections = [], selectedValue = '', onChange = () => {} } = props; //  selections = [{label: "", value: ""}]

  return (
    <div className={root}>
      {selections?.map((item, key) => {
        return (
          <TabButton
            variant={item?.value === selectedValue ? 'active' : 'inactive'}
            key={`tab-${key}`}
            onClick={() => onChange(item?.value)}
          >
            {item?.label}
          </TabButton>
        );
      })}
    </div>
  );
};

export default TabsGroup;
