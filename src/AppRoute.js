import { Redirect, Route, Switch } from "react-router-dom";
import Home from "views/Home";
import Reception from "views/Reception";
import Treatment from "views/Treatment";
import Test from "views/Test";
import Members from "views/Members";


//jsconfig로 하면 src가 기본 경로로 되어있음

function AppRoute(props) {
  return (
    <Switch>
      <Route path={`${props.match.url}/home`} exact component={Home}/>
      <Route path={`${props.match.url}/reception`} exact component={Reception}/>
      <Route path={`${props.match.url}/treatment`} exact component={Treatment}/>
      <Route path={`${props.match.url}/test`} exact component={Test}/>
      <Route path={`${props.match.url}/members`} exact component={Members}/>
      <Redirect to={`${props.match.url}/home`} />
      {/* 어느 누구도 해당하지 않으면 home으로 감  */}
    </Switch>
  );
}

export default AppRoute;
