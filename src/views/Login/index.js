import { useState } from "react";
import "./login.css";
import LoginModal from "views/Login/components/LoginModal"

function Login() { //컴포넌트 이름
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div style={{backgroundColor:"#CDDFDB"}}>
      <div><img src="logo.png" className="mt-3 ml-4" /></div>
      <div>
      <div className="row ml-0 mr-0 mt-2">
        <div className="col-6">
          <div className="logintitle"><h1>Let's start</h1><span>It's going to take only a few minutes</span></div>
          <div className="row ml-0 mr-0">
            <div className="col-4">
              <button type="button" onClick={handleShow} className="banner" data-toggle="modal" data-target="#exampleModal">데스크</button>
            </div>
            <div className="col-4">
              <button type="button" onClick={handleShow} className="banner" data-toggle="modal" data-target="#exampleModal">진료실</button>
            </div>
            <div className="col-4">
              <button type="button" onClick={handleShow}className="banner" data-toggle="modal" data-target="#exampleModal">검사실</button>
            </div>
          </div>
        </div>
      <div className="col-6 loginimg">
        <img src="Doctors-pana.png" width="90%"/>
      </div>
      </div>
      </div>

    <LoginModal show={show} handleClose={handleClose} />

</div>
  );
}

export default Login;