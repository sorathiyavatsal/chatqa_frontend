import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <Routers />
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

  </React.StrictMode>);
reportWebVitals();