import { Link } from 'react-router-dom';

import { ReactComponent as BrandLogoSVG } from 'assets/images/brand-logo.svg';
import { ReactComponent as InfoSVG } from 'assets/icons/info-icon.svg';
import { ReactComponent as HomeSVG } from 'assets/icons/home-icon.svg';
import { ReactComponent as DashboardSVG } from 'assets/icons/dashboard-icon.svg';
import SampleProfileImage from 'assets/images/sample-pp-image.png';
import { Button } from 'components/atoms';
import { storageKeys } from 'libs/keys';
import { useHistory } from "react-router-dom";

import styles from './styles.module.scss';
import { NavigationLink } from 'components/molecules';

const { root, profile_picture, navigation, nav_link } = styles;

const MainHeader = () => {
  const history = useHistory();
  return (
    <header className={root}>
      <div>
        <BrandLogoSVG width={128} height={24} />
        <nav className={navigation}>
          <NavigationLink prefixIcon={<HomeSVG />} isActive={true}>
            Home
          </NavigationLink>
          <NavigationLink prefixIcon={<DashboardSVG />}>
            Dashboard
          </NavigationLink>
        </nav>
      </div>
      <div>
      <Button
            variant="primary"
            onClick={() => {
   
                localStorage.removeItem(storageKeys.token);
              history.push("/login")}}
          >
            Logout
          </Button>
        <InfoSVG />
        <figure className={profile_picture}>
          <img src={SampleProfileImage} alt="profile-picture" />
        </figure>
      </div>
    </header>
  );
};

export default MainHeader;
