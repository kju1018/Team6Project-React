import { NavLink } from "react-router-dom";


function AppMenu() {
    return (

    <ul className="nav flex-column mt-5">
      <li className="nav-item">
        <NavLink to="/" exact className="nav-link pt-4 pb-4" activeStyle={{color:"#A2C9BB", backgroundColor:"#F5F9F8", borderRadius:"0px 20px 20px 0px"}} style={{color:"black"}}>
          <div className="row">
            <div className="col-6 text-right"><i className="bi bi-house-door"></i></div>
            <div className="col-6">로그인</div>
          </div>
        </NavLink>
        <NavLink to="/home" exact className="nav-link pt-4 pb-4" activeStyle={{color:"#A2C9BB", backgroundColor:"#F5F9F8", borderRadius:"0px 20px 20px 0px"}} style={{color:"black"}}>
          <div className="row">
            <div className="col-6 text-right"><i className="bi bi-house-door"></i></div>
            <div className="col-6">로그인</div>
          </div>
        </NavLink>
        {/* Link는 이걸 클릭하면 이동한다 라는 뜻 */}
        <NavLink to="/reception" className="nav-link pt-4 pb-4" style={{color:"black"}} activeStyle={{color:"#A2C9BB", backgroundColor:"#F5F9F8", borderRadius:"0px 20px 20px 0px"}} style={{color:"black"}}>
        <div className="row">
            <div className="col-6 text-right"><i className="bi bi-receipt"></i></div>
            <div className="col-6">접수</div>
          </div>
        </NavLink>
        <NavLink to="/treatment" className="nav-link pt-4 pb-4" style={{color:"black"}} activeStyle={{color:"#A2C9BB", backgroundColor:"#F5F9F8", borderRadius:"0px 20px 20px 0px"}} style={{color:"black"}}>
          <div className="row">
            <div className="col-6 text-right"><i className="bi bi-calendar-plus"></i></div>
            <div className="col-6">진료</div>
          </div>
        </NavLink>
        <NavLink to="/test" className="nav-link pt-4 pb-4" style={{color:"black"}} activeStyle={{color:"#A2C9BB", backgroundColor:"#F5F9F8", borderRadius:"0px 20px 20px 0px"}} style={{color:"black"}}>
          <div className="row">
            <div className="col-6 text-right"><i className="bi bi-eyedropper"></i></div>
            <div className="col-6">검사</div>
          </div>
        </NavLink>
      </li>
    </ul>

    );
}


export default AppMenu;