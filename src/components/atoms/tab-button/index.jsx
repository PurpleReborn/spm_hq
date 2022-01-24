import { joinClasses } from 'helpers/common';
import styles from './styles.module.scss';

const { root } = styles;

// variant = active | inactive

const TabButton = (props) => {
  const {
    children,
    variant = '',
    prefixIcon = null,
    suffixIcon = null,
    onClick = () => {},
    disabled = false,
  } = props;
  const classes = joinClasses([root, styles[variant]]);

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {prefixIcon || null}
      {children}
      {suffixIcon || null}
    </button>
  );
};

export default TabButton;
