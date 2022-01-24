import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const { root, nav_link } = styles;

const NavigationLink = (props) => {
  const { prefixIcon = null, children, isActive = false } = props;

  return (
    <Link to="/" className={root}>
      <div className={nav_link} data-isactive={isActive}>
        {prefixIcon || null}
        <p>{children}</p>
      </div>
    </Link>
  );
};

export default NavigationLink;
