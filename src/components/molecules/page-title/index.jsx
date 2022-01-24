import styles from './styles.module.scss';

const { root } = styles;

const PageTitle = (props) => {
  const { children, title = '' } = props;

  return (
    <header className={root}>
      <h3>{title}</h3>
      <div>{children}</div>
    </header>
  );
};

export default PageTitle;
