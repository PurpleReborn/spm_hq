import styles from './styles.module.scss';

const { root } = styles;

const TitleDescriptionItem = (props) => {
  const { title, description } = props;

  return (
    <div className={root}>
      <span>{title}</span>
      <p>{description}</p>
    </div>
  );
};

export default TitleDescriptionItem;
