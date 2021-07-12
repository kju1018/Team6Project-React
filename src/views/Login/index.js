import { useState } from "react";
import "./login.css";
import LoginModal from "views/Login/components/LoginModal"
import { Button, Form } from "react-bootstrap";
import { LoginApi } from "apis/Auth";
import { useDispatch, useSelector } from "react-redux";
import { createSetAuthTokenAction, createSetCodeNumberAction, createSetRoleAuthority, createSetUseridAction } from "redux/auth-rducer";
import { Redirect, useHistory } from "react-router";
import { addAuthHeader } from "apis/axiosConfig";

const errorMsg = {
  password_empty : '비밀번호를 입력해주세요.',
  userid_empty : '직원아이디를 입력해주세요.',
  err_login:"아이디 비밀번호를 다시 한번 확인해주세요.",
  err_nullAuth:"해당 병원에 없는 계정입니다."
}

function Login(props) { //컴포넌트 이름
  const history = useHistory();
  const globalcode = useSelector((state) => {return state.authReducer.codenumber});
  const globalUserid = useSelector((state) => {return state.authReducer.userid});
  const dispatch = useDispatch();

  const [errorMessageUserid, setErrorMessageUserid] = useState(errorMsg.userid_empty);
  const [errorMessagePassword, setErrorPassword] = useState(errorMsg.password_empty);
  const [isInvalidUserid, setIsInvalidUserid] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const [loginForm, setLoginFoem] = useState({
    userid:"",
    userpassword:""
  })
  
  const handleChange = (event) => {
    setLoginFoem({
      ...loginForm,
      [event.target.name] : event.target.value
    })
  }

  const moveMain = (event) => {
    dispatch(createSetCodeNumberAction(""));
    sessionStorage.removeItem("codenumber");
  }
 
  //만약 로그인이 되어 있다면 홈으로 이동
  if(globalUserid != null && globalUserid != "") {
    console.log("로그인 되어 있음");
    return <Redirect to="/main"></Redirect>
    // history.push('/main');
  } 

  //병원코드가 없다면 다시 프로그램 메인으로 이동
  if(globalcode == null || globalcode === "") {
    return <Redirect to="/"></Redirect>
    // history.push('/');
  }

  const handleLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//빈칸이 있을경우
      setErrorMessageUserid(errorMsg.userid_empty);
      setErrorPassword(errorMsg.password_empty);
      setValidated(true);
    } else {
      loginForm.codenumber = globalcode
      const response = LoginApi(loginForm);

      response
        .then((response) => {

        if(response.data.state === "err_nullAuth") {
          setErrorMessageUserid("");
          setErrorPassword(errorMsg.err_nullAuth);
          setIsInvalidUserid(true);
          setIsInvalidPassword(true);
        } else if(response.data.state === "success") {
          //로그인 성공시 redux에 저장
          dispatch(createSetUseridAction(response.data.userid));
          dispatch(createSetAuthTokenAction(response.data.authToken));
          dispatch(createSetRoleAuthority(response.data.role_authority));

          //요청 헤더에 추가
          addAuthHeader(response.data.authToken);

          //로그인 성공시 sessionStorage에 저장
          sessionStorage.setItem("authToken", response.data.authToken);
          sessionStorage.setItem("userid", response.data.userid);
          sessionStorage.setItem("role_authority", response.data.role_authority);
        }

      }).catch((error) => {
        if(error.response.status === 401) {
          setErrorMessageUserid("");
          setErrorPassword(errorMsg.err_login);
          setIsInvalidUserid(true);
          setIsInvalidPassword(true);
        }
      })
    }


    
  }
  return (
    <div style={{backgroundColor:"#F9F7F9", height:"100vh"}}>
      <div className="row mr-0 ml-0" style={{alignItems:"center"}}><img src="logo.png" className="mt-3 ml-4" style={{width: "50px"}}/><div className="mt-3 ml-2" style={{fontSize:"26px"}}>더조은 병원</div></div>
      <div style={{height:"500px"}}>
        <div className="row ml-0 mr-0 mt-2">
          <div className="col-6">
            <div className="logintitle"><h1>Let's start</h1><span>It's going to take only a few minutes</span></div>
            <div className="pr-5 pl-3">
              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group controlId="formBasicID">
                  <Form.Label>UserID</Form.Label>
                  <Form.Control required type="text" name="userid" placeholder="직원 ID를 입력하세요." value={loginForm.userid} onChange={handleChange} isInvalid={isInvalidUserid}/>
                  <Form.Control.Feedback type="invalid">{errorMessageUserid}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" name="userpassword" placeholder="비밀번호를 입력하세요." value={loginForm.userpassword} onChange={handleChange} isInvalid={isInvalidPassword}/>
                  <Form.Control.Feedback type="invalid">{errorMessagePassword}</Form.Control.Feedback>
                </Form.Group>
                <div className="text-center mt-4">
                  <Button variant="dark" className="mr-1" onClick={moveMain}>
                    메인으로
                  </Button>
                  <Button variant="secondary" type="submit" className="ml-1">
                    로그인
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-6 loginimg 100vh overflow-auto">
            <img src="Doctors-rafiki.png" width="90%"/>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;