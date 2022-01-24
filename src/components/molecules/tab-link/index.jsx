import { useEffect } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

import styles from './styles.module.scss';

const { root, icon_container } = styles;

const TabLink = (props) => {
  const { prefixIcon = null, children, to = '' } = props;
  const location = useLocation();
  const isActive = matchPath(location?.pathname, {
    path: to,
    exact: true,
    strict: true,
  })
    ? true
    : false;

  return (
    <Link className={root} to={to} data-isactive={isActive}>
      {prefixIcon ? (
        <div className={icon_container} data-isactive={isActive}>
          {prefixIcon}
        </div>
      ) : null}
      <p>{children}</p>
    </Link>
  );
};

export default TabLink;
