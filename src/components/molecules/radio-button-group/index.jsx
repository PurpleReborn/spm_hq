import { RadioButton } from 'components/atoms';
import styles from './styles.module.scss';

const { root } = styles;

const RadioButtonGroup = (props) => {
  const { selections = [], onChange, currentValue } = props;

  return (
    <div className={root}>
      {selections?.map((item, idx) => {
        return (
          <RadioButton
            key={idx}
            value={item.value}
            onChange={onChange}
            checked={currentValue === item.value}
            label={item?.label}
          />
        );
      })}
    </div>
  );
};

export default RadioButtonGroup;
