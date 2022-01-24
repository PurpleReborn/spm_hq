import Routes from 'routes';
import { ToastContainer } from 'react-toastify';
import { StoreProvider } from 'store';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';

import './styles/calendar.scss';

function App() {
  return (
    <StoreProvider>
      <Routes />
      <ToastContainer />
    </StoreProvider>
  );
}

export default App;
