import { ReactNode } from 'react';
import styles from './styles.module.scss';

const { root } = styles;

const ErrorMessage = ({ large = false, children }) => {
  return (
    <span className={root} data-large={`${large}`}>
      {children}
    </span>
  );
};

export default ErrorMessage;
