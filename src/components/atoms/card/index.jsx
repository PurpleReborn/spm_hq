import styles from './styles.module.scss';

const { card } = styles;

const Card = (props) => {
  const { children, color, width, bordered = 'solid' } = props; // color = white | grey; width = default | fit-content; bordered = solid | dash

  return (
    <div
      className={card}
      data-color={color}
      data-width={width}
      data-bordered={bordered}
    >
      {children}
    </div>
  );
};

export default Card;
