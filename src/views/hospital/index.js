import { LoginCode } from "apis/Auth";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Redirect, Route, Switch, useHistory } from "react-router-dom";
import { createSetCodeNumberAction } from "redux/auth-rducer";
import Treatment from "views/Treatment";
import HospitalNotice from "./HospitalNotice";
import HospitalNoticeDetail from "./HospitalNoticeDetail";

const errorMsg = {
  password_empty : '비밀번호를 입력해주세요.',
  code_empty : '병원코드를 입력해주세요.',
  err_password: '비밀번호가 틀렸습니다.',
  err_code:'병원코드가 틀렸습니다.'
}

function Hospital(props) {
  const history = useHistory();
  const globalcode = useSelector((state) => {return state.authReducer.codenumber});
  const dispatch = useDispatch();
  const [errorMessageCode, setErrorMessageCode] = useState(errorMsg.code_empty);
  const [errorMessagePassword, setErrorPassword] = useState(errorMsg.password_empty);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [codeLogin, setCodeLogin] = useState({
    codenumber:"",
    password:""
  })

  const handleChange = (event) => {
    setCodeLogin({
      ...codeLogin,
      [event.target.name]:event.target.value
    })
  }

  //병원코드가 있다면 login페이지로 이동
  if(globalcode != null && globalcode != "") {
    console.log("병원 코드 있음");
    return <Redirect to="/login"></Redirect>
    // history.push('/login');
  }


  const handleLogin = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//빈칸이 있을경우
      setErrorMessageCode(errorMsg.code_empty);
      setErrorPassword(errorMsg.password_empty);
      setValidated(true);
    } else {
      const response = LoginCode(codeLogin);

      response
        .then((response) => {
          console.log(response.data);
          if(response.data.state === "success"){

            dispatch(createSetCodeNumberAction(response.data.codenumber));
            sessionStorage.setItem("codenumber", response.data.codenumber); 

          } else if(response.data.state === "numberErr"){

            setIsInvalidCode(true);
            setIsInvalidPassword(false);
            setErrorMessageCode(errorMsg.err_code);
            setErrorPassword(errorMsg.password_empty);

          } else if(response.data.state === "passwordErr") {

            setIsInvalidCode(false);
            setIsInvalidPassword(true);
            setErrorMessageCode(errorMsg.code_empty);
            setErrorPassword(errorMsg.err_password);

          }
        }).catch((error) =>{
          console.log(error);
        })

    }

  }

  
  return (
    <div style={{height:"100vh"}}>
      <div className="pb-2" style={{backgroundColor:"#ffffff"}}><img src="douzone.PNG" className="pl-5" style={{width: "250px"}}/></div>
      <div className="d-flex">
        <div className="col-6">
          <div className="pt-5 pl-5">
            <div className="card" style={{width:"70%", marginLeft:"115px", marginTop:"0px"}}>
              <div className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>System Login</div>
                <div className="card-body">
                <div>
                  <img src="Login-amico.png" width="80%"/>
                </div>
                  <Form noValidate validated={validated} onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicID">
                      <Form.Label>Hospital Code</Form.Label>
                      <Form.Control required type="text" name="codenumber" placeholder="병원코드(숫자)를 입력하세요." value={codeLogin.codenumber} onChange={handleChange} isInvalid={isInvalidCode}/>
                      <Form.Control.Feedback type="invalid">{errorMessageCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control required type="password" name="password" placeholder="비밀번호를 입력하세요." value={codeLogin.password} onChange={handleChange} isInvalid={isInvalidPassword}/>
                      <Form.Control.Feedback type="invalid">{errorMessagePassword}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-center mt-4">
                      <Button variant="secondary" type="submit">
                        로그인
                      </Button>
                    </div>
                  </Form>
                </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="pt-5 pl-5">
            <div>
              <div className="row" style={{width:"70%"}}>
                <div className="col card p-3" style={{height:"790px", border:"1px solid gray"}}>
                  <HospitalNotice></HospitalNotice>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hospital;