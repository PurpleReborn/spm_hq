import { joinClasses } from 'helpers/common';
import styles from './styles.module.scss';

const { root } = styles;

// variant = primary | secondary

const Button = (props) => {
  const {
    children,
    variant = '',
    prefixIcon = null,
    suffixIcon = null,
    onClick = () => {},
    disabled = false,
    bordered = false,
    size = '', // small | large | "full"
  } = props;
  const classes = joinClasses([root, styles[variant]]);

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-size={size}
      data-bordered={bordered}
    >
      {prefixIcon || null}
      {children}
      {suffixIcon || null}
    </button>
  );
};

export default Button;
