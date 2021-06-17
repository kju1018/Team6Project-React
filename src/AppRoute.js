import { Redirect, Route, Switch } from "react-router-dom";
import Home from "views/Home";
import Login from "views/Login";
import Reception from "views/Reception";
import Treatment from "views/Treatment";
import Test from "views/Test";


//jsconfig로 하면 src가 기본 경로로 되어있음

function AppRoute(props) {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/reception" exact component={Reception}/>
      <Route path="/treatment" exact component={Treatment}/>
      <Route path="/test" exact component={Test}/>
      <Redirect to="/" />
      {/* 어느 누구도 해당하지 않으면 home으로 감  */}
    </Switch>
  );
}

export default AppRoute;
