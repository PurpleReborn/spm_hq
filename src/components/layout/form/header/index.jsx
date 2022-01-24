import styles from './styles.module.scss';

const { root } = styles;

const FormHeader = ({ title }) => {
  return (
    <header className={root}>
      <h4>{title}</h4>
    </header>
  );
};

export default FormHeader;
