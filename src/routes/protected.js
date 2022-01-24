import { storageKeys } from 'libs/keys';
import React, { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { FormLayout, MainLayout } from 'components/layout';

import {
  UserManagementPage,
  DeliveryOrderPage,
  CustomerOrderPage,
  FactoryPage,
  CustomerPage,
  SupplierPage,
  ProductPage,
} from 'pages';
import CreateCustomerOrderPage from 'pages/customer-order/create';

// const CreateCustomerOrderPage = lazy(() =>
//   import('pages/customer-order/create')
// );
// const CustomerOrderPage = lazy(() => import('pages/customer-order'));

const routes = [
  {
    name: 'User Management',
    component: UserManagementPage,
    path: '/user-management',
    exact: true,
  },
  {
    name: 'Customer Order',
    component: CustomerOrderPage,
    path: '/customer-order',
    exact: true,
  },
  {
    name: 'Delivery Order',
    component: DeliveryOrderPage,
    path: '/delivery-order',
    exact: true,
  },
  {
    name: 'Factory',
    component: FactoryPage,
    path: '/factory',
    exact: true,
  },
  {
    name: 'Customer',
    component: CustomerPage,
    path: '/customer',
    exact: true,
  },
  {
    name: 'Supplier',
    component: SupplierPage,
    path: '/supplier',
    exact: true,
  },
  {
    name: 'Product',
    component: ProductPage,
    path: '/product',
    exact: true,
  },
];

// const formRoutes = [
//   {
//     name: 'Create Customer Order',
//     component: CreateCustomerOrderPage,
//     path: '/customer-order/create',
//     exact: true,
//   },
// ];

const Protected = () => {
  return (
    <Switch>
      <MainLayout>
        {routes.map((route) => {
          return (
            <Route
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </MainLayout>

      {/* {formRoutes.map((route) => {
        return (
          <FormLayout>
            <Route
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          </FormLayout>
        );
      })} */}

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

export default Protected;
