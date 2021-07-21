import AppMenu from "AppMenu";
import AppRoute from "AppRoute";
import { Redirect, Route, Switch } from "react-router-dom";
import Menus from "views/components/Menu";
import Home from "views/Home";
import Reception from "views/Reception";
import Treatment from "views/Treatment";
import Test from "views/Test";
import Members from "views/Members";
import Redis from "views/components/Redis";
import { useSelector } from "react-redux";

function Main(props) {
  
  const globalUserid = useSelector((state) => {return state.authReducer.userid});
   //유저 아이디가 없다면 다시 로그인 페이지로 이동
   if(globalUserid == null || globalUserid === "") {
    return <Redirect to="/"></Redirect>
  }

  return (
    <>
      <Menus ></Menus>
      <div className="flex-grow-1 container-fluid pl-0 pr-0">
        <div className="row h-100 mr-0 ml-0">
          <div className="col-1 pl-0 border-right align-items-end" style={{position:"relative", backgroundColor:"#FFFFFF"}}>
            <AppMenu/>
          </div>
          <Redis/>
          <div className="col-11 pl-0 pr-0" >
          <Switch>
            <Route path={`${props.match.url}/home`} exact component={Home}/>
            <Route path={`${props.match.url}/reception`} exact component={Reception}/>
            <Route path={`${props.match.url}/treatment`} exact component={Treatment}/>
            <Route path={`${props.match.url}/test`} exact component={Test}/>
            <Route path={`${props.match.url}/members`} exact component={Members}/>
            <Redirect to={`${props.match.url}/home`} />
          {/* 어느 누구도 해당하지 않으면 home으로 감  */}
          </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;