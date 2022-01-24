import styles from './styles.module.scss';

const { root } = styles;

const Divider = (props) => {
  const { grey } = props;

  return <div className={root} data-grey={grey} />;
};

export default Divider;
