import { useEffect, useState } from 'react';
import { Loader } from 'components/atoms';
import { storageKeys } from 'libs/keys';
import { Redirect, Route, useHistory } from 'react-router-dom';
// import { useStore } from 'store';
// import { userServices } from './fetch';
// import { getUserToken } from 'helpers/storage';
import axios from 'axios'

export const GuestRoute = ({ component: Component, ...rest }) => {
  return <Route render={(props) => <Component {...props} />} {...rest} />;
};

export const logout = () => {
  localStorage.removeItem(storageKeys.token);
  window.location.replace('/login');
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  //   const { handleUserData } = useStore();
  const [token, setToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
      if(user === 'Admin'){
        console.log('okkkk');
        setIsAuthenticated(true)
        history.push("/user-management")
        // history.push("/dekstop/penerimaan-bahan-baku")
      }
    }catch(err){
      // console.log(err);
      setIsAuthenticated(false)
    }
  }

  const decode = async () => {
    await getLocal()
    await getData(token)
  }

  useEffect(()=> {
    decode()
  },[token])

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // const token = getUserToken();
    // if (token) {
    //   userServices
    //     .decodeToken()
    //     .then((res) => {
    //       if (isMounted) {
    //         const user = res.value.user;
    //         console.log(user, 'this is result decode token');
    //         handleUserData(user);
    //         setIsAuthenticated(true);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err, 'this is error decode token');
    //       // history.push('/signin');
    //       window.location.replace('/signin');
    //       localStorage.removeItem(storageKeys.token);
    //       setIsAuthenticated(false);
    //       setLoading(false);
    //     })
    //     .finally(() => {
    //       if (isMounted) {
    //         setLoading(false);
    //       }
    //     });
    // } else {
    //   setIsAuthenticated(false);
    //   setLoading(false);
    // }

    if (isMounted) {
      setTimeout(() => {
        setLoading(false);
        // setIsAuthenticated(true);
      }, 2000);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ width: '100%', height: '100vh' }}>
          <Loader text="Redirecting..." size="large" />
        </div>
      ) : (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated) {
              return <Component {...props} />;
            } else {
              return <Component {...props} />;
              // return <Redirect to="/login" />;
            }
          }}
        />
      )}
    </>
  );
};
