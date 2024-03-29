import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        {/* <BrowserRouter basename="/car-rental-app"> */}
        <Provider store={store}>
          <App />
        </Provider>
        {/* </BrowserRouter> */}
      </HashRouter>
    </PersistGate>
  </React.StrictMode>
);
