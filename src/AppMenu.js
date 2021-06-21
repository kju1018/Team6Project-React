import { NavLink } from "react-router-dom";


function AppMenu() {
    return (
    <>
    <div style={{backgroundColor:"#ECECEC", height:"58vh", marginRight:"-15px"}}></div>
    <div style={{marginTop:"3vh"}}>
    <ul className="nav flex-column" >
      <li className="nav-item">
        <NavLink to="/" exact className="nav-link pt-2 pb-2 mt-3 mb-3" activeStyle={{color:"#000000", backgroundColor:"#9ACAA1"}} style={{color:"black"}}>
          <div className="row">
            <div className="col-5 text-right"><i className="bi bi-house-door"></i></div>
            <div className="col-7 pl-0">Login</div>
          </div>
        </NavLink>
        <NavLink to="/home" exact className="nav-link pt-2 pb-2 mt-3 mb-3" activeStyle={{color:"#000000", backgroundColor:"#9ACAA1"}} style={{color:"black"}}>
          <div className="row">
            <div className="col-5 text-right"><i className="bi bi-house-door"></i></div>
            <div className="col-7 pl-0">Home</div>
          </div>
        </NavLink>
        {/* Link는 이걸 클릭하면 이동한다 라는 뜻 */}
        <NavLink to="/reception" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#000000", backgroundColor:"#9ACAA1"}}>
        <div className="row">
            <div className="col-5 text-right"><i className="bi bi-receipt"></i></div>
            <div className="col-7 pl-0">Reception</div>
          </div>
        </NavLink>
        <NavLink to="/treatment" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#000000", backgroundColor:"#9ACAA1"}}>
          <div className="row">
            <div className="col-5 text-right"><i className="bi bi-calendar-plus"></i></div>
            <div className="col-7 pl-0">Treatemnt</div>
          </div>
        </NavLink>
        <NavLink to="/test" className="nav-link pt-2 pb-2 mt-3 mb-3" style={{color:"black"}} activeStyle={{color:"#000000", backgroundColor:"#9ACAA1"}}>
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