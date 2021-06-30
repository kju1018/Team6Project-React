
import { AppContextProvider } from "AppContext";
import AppRoute from "AppRoute";
import Main from "Main";
import { Redirect, Route, Switch } from "react-router-dom";
import Hospital from "views/hospital";
import Login from "views/Login";
import './App.css';


function App(props) {
  return (
    <div className="d-flex flex-column vh-100" style={{width:"1920px", backgroundColor:"#F9F7F9"}}>
      <Switch>
        <Route path="/" component={Hospital}/>
        <Route path="/login" exact component={Login}/>
        <AppContextProvider>
        <Route path="/main" component={Main}/>
        </AppContextProvider>
        <Redirect to="/" />
        {/* 어느 누구도 해당하지 않으면 home으로 감  */}
      </Switch>
    </div>
  );
}

export default App;


//  <div className="col-1 pl-0 border-right border-gray align-items-end text-bottom" style={{position:"relative", backgroundColor:"#FFFFFF"}}>