import styles from './styles.module.scss';

const { wrapper, radio_btn, radio_btn__inner } = styles;

const RadioButton = (props) => {
  const { value, label, onChange = () => {}, checked } = props;

  return (
    <label className={wrapper}>
      <input
        type="radio"
        name="group"
        checked={checked}
        onChange={(e) => {
          console.log(e, 'this is checkbox');
          onChange(value);
        }}
      />
      <span className={radio_btn}>
        <span className={radio_btn__inner} />
      </span>
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
