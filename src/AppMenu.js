
import { removeAuthHeader } from "apis/axiosConfig";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSetAuthTokenAction, createSetCodeNumberAction, createSetRoleAuthority, createSetUseridAction } from "redux/auth-rducer";


function AppMenu() {
    const dispatch = useDispatch();

    const globalUserRole = useSelector((state) => { return state.authReducer.role_authority });

    const logout = () => {
      //Redux를 이용
      dispatch(createSetUseridAction(""));
      dispatch(createSetAuthTokenAction(""));
      dispatch(createSetCodeNumberAction(""));
      dispatch(createSetRoleAuthority(""));

      //요청헤더에 authToken제거
      removeAuthHeader();

      //SessionStorage에 인증 내용 제거
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("authToken");    
      sessionStorage.removeItem("codenumber");
      sessionStorage.removeItem("role_authority");
    }

    return (
    <>
    <div style={{backgroundColor:"#1B296D", height:"58vh", marginRight:"-15px"}}>
    </div>
    <div style={{marginTop:"3vh"}}>
      <ul className="nav flex-column" >
        <li className="nav-item">
          <NavLink to="/main/home" exact className="nav-link pt-2 pb-2 mt-3 mb-3" activeStyle={{color:"#FFFFFF", backgroundColor:"#2F4273"}} style={{color:"black"}}>
            <div className="row">
              <div className="col-5 text-right"><i className="bi bi-house-door"></i></div>
              <div className="col-7 pl-0">Home</div>
            </div>
          </NavLink>
          {/* Link는 이걸 클릭하면 이동한다 라는 뜻 */}
          {globalUserRole === "ROLE_DOCTOR" ? 
            null 
          : 
            <NavLink to="/main/reception" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#FFFFFF", backgroundColor:"#2F4273"}}>
            <div className="row">
                <div className="col-5 text-right"><i className="bi bi-receipt"></i></div>
                <div className="col-7 pl-0">Reception</div>
              </div>
            </NavLink>
          }
          {globalUserRole === "ROLE_NURSE" ? 
            null 
          :
            <>
              <NavLink to="/main/treatment" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#FFFFFF", backgroundColor:"#2F4273"}}>
                <div className="row">
                  <div className="col-5 text-right"><i className="bi bi-calendar-plus"></i></div>
                  <div className="col-7 pl-0">Treatment</div>
                </div>
              </NavLink>
              <NavLink to="/main/test" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#FFFFFF", backgroundColor:"#2F4273"}}>
                <div className="row">
                  <div className="col-5 text-right"><i className="bi bi-eyedropper"></i></div>
                  <div className="col-7 pl-0">Test</div>
                </div>
              </NavLink>
            </>
          }
          {globalUserRole === "ROLE_ADMIN" 
          ? 
            <NavLink to="/main/members" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#FFFFFF", backgroundColor:"#2F4273"}}>
              <div className="row">
                <div className="col-5 text-right"><i className="bi bi-file-person"></i></div>
                <div className="col-7 pl-0">Members</div>
              </div>
            </NavLink>
          :
            null
          }

          <Button style={{marginTop:"20px", marginLeft:"35px"}} variant="dark" onClick={logout}>로그아웃</Button>
        </li>
      </ul>
    </div>
    </>
    );
}


export default AppMenu;