import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ProtectedRoute, GuestRoute } from 'services/authentication';
import { getUserToken } from 'helpers/storage';

import Protected from './protected';
import { storageKeys } from 'libs/keys';
import FormRoutes from './form';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <GuestRoute
          exact
          path="/signin"
          render={(props) => {
            // const token = getUserToken(storageKeys.token) || null;
            const token = true;

            if (token) {
              return <Redirect to="/" />;
            } else {
              return <SignInPage {...props} />;
            }
          }}
        /> */}
        <GuestRoute exact path="/signin" render={() => <div>Signin</div>} />
        <ProtectedRoute path="/form" component={FormRoutes} />
        <ProtectedRoute path="/" component={Protected} />
      </Switch>
    </Router>
  );
};

export default Routes;
