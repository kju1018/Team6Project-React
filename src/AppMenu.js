
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


function AppMenu() {
    return (
    <>
    <div style={{backgroundColor:"#1B296D", height:"58vh", marginRight:"-15px"}}>
      <div className="text-center pt-3">
        <div className="photo">
          <img src="/user.png" width="80" height="80"></img>
        </div>
        <div>
          <div class="form-group pl-2 pr-2">
            <label style={{color:"white"}}>이름</label>
            <input className="form-control text-center" value="김민석" readOnly/>
          </div>
          <div className="form-group pl-2 pr-2">
            <label style={{color:"white"}}>직책:</label>
            <input className="form-control text-center" value="의사" readOnly/>
          </div>
        </div>
        <Button variant="outline-light">로그아웃</Button>
      </div>
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
        <NavLink to="/main/reception" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#FFFFFF", backgroundColor:"#2F4273"}}>
        <div className="row">
            <div className="col-5 text-right"><i className="bi bi-receipt"></i></div>
            <div className="col-7 pl-0">Reception</div>
          </div>
        </NavLink>
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
      </li>
    </ul>
    </div>
    </>
    );
}


export default AppMenu;