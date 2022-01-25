import { storageKeys } from 'libs/keys';
import React, { lazy, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { FormLayout, MainLayout } from 'components/layout';
import axios from 'axios'

import {
  UserManagementPage,
  DeliveryOrderPage,
  CustomerOrderPage,
  FactoryPage,
  CustomerPage,
  SupplierPage,
  ProductPage,
  DekstopLogin
} from 'pages';
import CreateCustomerOrderPage from 'pages/customer-order/create';

// const CreateCustomerOrderPage = lazy(() =>
//   import('pages/customer-order/create')
// );
// const CustomerOrderPage = lazy(() => import('pages/customer-order'));

const routes = [
  {
    name: 'Login',
    component: DekstopLogin,
    path: '/login',
    exact: true,
  },
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
  const [token, setToken] = useState('')
  const [match, setMatch] = useState(false)

  console.log('match', match);

  const getLocal = async () => {
    const myToken = await localStorage.getItem(storageKeys.token)
    await setToken(myToken)
  }

  const getData = async (token) => {
    try{
      const res = await axios.get('https://api-nginx-spm.accelego.id/api/v1/master-data/decode-token', {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      });
      const user = res?.data?.value?.user?.role
      console.log('ini ressssss',user);
      // if(user !== '' && user !== null && user!== undefined){
        if(user === 'Admin'){
        console.log('okkkk');
        setMatch(true)
      }
    }catch(err){
      // console.log(err);
      setMatch(false)
    }
  }

  const decode = async () => {
    await getLocal()
    await getData(token)
    console.log(token);
  }

  useEffect(()=> {
    decode()
      // getLocal().then(()=>{
      //   getData(token)
      // })
  },[token, match])


  return (
    <Switch>
        {routes.map((route) => {
          if(route.path === '/login'){
            return (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            );
          }else{
            return (
              <MainLayout>
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
        </MainLayout>
            );
          }
        })}

{
        match ?       
        <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/user-management" />;
        }}
      /> :       
      <Route
      exact
      path="/"
      render={() => {
        return <Redirect to="/login" />;
      }}
    />
      }
      {/* </MainLayout> */}

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

      {/* <Route
        exact
        path="/"
        render={() => {
          // const token = getUserToken(storageKeys.token) || null;
          const token = true;

          if (match) {
            return <Redirect to="/user-management" />;
          } else {
            // return <Redirect to="/signin" />;
            return <Redirect to="/login" />;
          }
        }}
      /> */}
    </Switch>
  );
};

export default Protected;
