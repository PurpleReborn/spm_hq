import { createContext, useContext, useReducer } from 'react';
import reducer from './reducers';
import { SET_AUTHENTICATED } from './action-types.js';

const StoreContext = createContext({});

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
};

const useStoreActions = (initialState = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAuthentication = (auth, user) => {
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        auth,
        user,
      },
    });
  };

  return {
    state,
    handleAuthentication,
  };
};

export const StoreProvider = ({ children }) => {
  const { state, handleAuthentication } = useStoreActions();

  return (
    <StoreContext.Provider
      value={{
        state,
        handleAuthentication,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
