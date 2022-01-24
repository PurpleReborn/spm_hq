import { storageKeys } from 'libs/keys';
import React, { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { FormLayout, MainLayout } from 'components/layout';

import {
  UserManagementPage,
  DeliveryOrderPage,
  CustomerOrderPage,
} from 'pages';
import CreateCustomerOrderPage from 'pages/customer-order/create';
import CreateDeliveryOrderPage from 'pages/delivery-order/create';

// const CreateCustomerOrderPage = lazy(() =>
//   import('pages/customer-order/create')
// );
// const CustomerOrderPage = lazy(() => import('pages/customer-order'));

const formRoutes = [
  {
    name: 'Create Customer Order',
    component: CreateCustomerOrderPage,
    path: '/form/customer-order',
    exact: true,
  },
  {
    name: 'Create Customer Order',
    component: CreateDeliveryOrderPage,
    path: '/form/delivery-order',
    exact: true,
  },
];

const FormRoutes = () => {
  return (
    <Switch>
      {formRoutes.map((route) => {
        return (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        );
      })}

      <Route
        exact
        path="/"
        render={() => {
          // const token = getUserToken(storageKeys.token) || null;
          const token = true;

          if (token) {
            return <Redirect to="/user-management" />;
          } else {
            return <Redirect to="/signin" />;
          }
        }}
      />
    </Switch>
  );
};

export default FormRoutes;
