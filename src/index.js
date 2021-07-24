import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { createStore } from 'redux';
import rootReducer from 'redux/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createSetAuthTokenAction, createSetCodeNumberAction, createSetRoleAuthority, createSetUseridAction, createSetUserName } from 'redux/auth-rducer';
import { addAuthHeader } from 'apis/axiosConfig';

const store = createStore(rootReducer, composeWithDevTools());

//Redux에 인증 정보 설정
store.dispatch(createSetCodeNumberAction(sessionStorage.getItem("codenumber") || ""));
store.dispatch(createSetUseridAction(sessionStorage.getItem("userid") || ""));
store.dispatch(createSetAuthTokenAction(sessionStorage.getItem("authToken") || ""));
store.dispatch(createSetRoleAuthority(sessionStorage.getItem("role_authority") || ""));
store.dispatch(createSetUserName(sessionStorage.getItem("username") || ""));

//Axios에 인증 헤더 추가
addAuthHeader(sessionStorage.getItem("authToken"));

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
