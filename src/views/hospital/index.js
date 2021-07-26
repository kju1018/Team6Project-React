import { LoginApi, LoginCode } from "apis/Auth";
import { addAuthHeader } from "apis/axiosConfig";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { createSetAuthTokenAction, createSetCodeNumberAction, createSetRoleAuthority, createSetUseridAction, createSetUserName } from "redux/auth-rducer";
import Treatment from "views/Treatment";
import HospitalNotice from "./HospitalNotice";
import HospitalNoticeDetail from "./HospitalNoticeDetail";

const errorMsg = {
  code_empty : '병원코드를 입력해주세요.',
  userid_empty : '직원아이디를 입력해주세요.',
  password_empty : '비밀번호를 입력해주세요.',
  err_login:"아이디 비밀번호를 다시 한번 확인해주세요.",
  err_nullAuth:"해당 병원에 없는 계정입니다."
}

function Hospital(props) {

  const globalUserid = useSelector((state) => {return state.authReducer.userid});
  const dispatch = useDispatch();

  const [errorMessageCode, setErrorMessageCode] = useState(errorMsg.code_empty);
  const [errorMessageUserid, setErrorMessageUserid] = useState(errorMsg.userid_empty);
  const [errorMessagePassword, setErrorPassword] = useState(errorMsg.password_empty);

  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isInvalidUserid, setIsInvalidUserid] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [validated, setValidated] = useState(false);
  
  const [loginForm, setLoginFoem] = useState({
    codenumber:"",
    userid:"",
    userpassword:""
  })

  const handleChange = (event) => {
    setLoginFoem({
      ...loginForm,
      [event.target.name]:event.target.value
    })
  }
  //만약 로그인이 되어 있다면 홈으로 이동
  if(globalUserid != null && globalUserid !== "") {
    return <Redirect to="/main/home"></Redirect>
    // history.push('/main');
  } 

  const handleLogin = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//빈칸이 있을경우
      setErrorMessageCode(errorMsg.code_empty);
      setErrorMessageUserid(errorMsg.userid_empty);
      setErrorPassword(errorMsg.password_empty);
      setValidated(true);
    } else {
      const response = LoginApi(loginForm);

      response
        .then((response) => {
          if(response.data.state === "success"){

              //로그인 성공시 redux에 저장
            dispatch(createSetUseridAction(response.data.userid));
            dispatch(createSetAuthTokenAction(response.data.authToken));
            dispatch(createSetRoleAuthority(response.data.role_authority));
            dispatch(createSetCodeNumberAction(response.data.codenumber));
            dispatch(createSetUserName(response.data.username));

            //요청 헤더에 추가
            addAuthHeader(response.data.authToken);

            //로그인 성공시 sessionStorage에 저장
            sessionStorage.setItem("userid", response.data.userid);
            sessionStorage.setItem("authToken", response.data.authToken);
            sessionStorage.setItem("role_authority", response.data.role_authority);
            sessionStorage.setItem("codenumber", response.data.codenumber); 
            sessionStorage.setItem("username", response.data.username);

          } else if(response.data.state === "err_nullAuth") {// 해당 병원에 계정이 없을경우
            setIsInvalidCode(false);
            setIsInvalidUserid(true);
            setIsInvalidPassword(false);

            setErrorMessageCode(errorMsg.code_empty);
            setErrorMessageUserid(errorMsg.err_nullAuth);
            setErrorPassword(errorMsg.password_empty);
          }

        }).catch((error) =>{
          console.log(error.response);
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
    <div style={{height:"100vh", backgroundImage:'url(/assets/docc.jpg)', backgroundRepeat:"no-repeat"}}>
      <div className="d-flex">
            <div className="card" style={{width:"50%", height:"30%", marginLeft:"25%", marginTop:"12%"}}>
              <div className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white", fontWeight:"bold", fontSize:"24px"}}>LOGIN</div>
                <div className="card-body row mt-4 ml-2" style={{height:"410px"}}>
                  <div className="col-5" style={{height:"390px"}}>
                  <Form noValidate validated={validated} onSubmit={handleLogin}>

                      <Form.Group controlId="formBasicID">
                        <Form.Label><div style={{fontWeight:"bold"}}>Hospital Code</div></Form.Label>
                        <Form.Control required type="text" name="codenumber" placeholder="병원코드(숫자)를 입력하세요." value={loginForm.codenumber} onChange={handleChange} isInvalid={isInvalidCode}/>
                        <Form.Control.Feedback type="invalid">{errorMessageCode}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formBasicID">
                        <Form.Label><div style={{fontWeight:"bold"}}>UserID</div></Form.Label>
                        <Form.Control required type="text" name="userid" placeholder="직원 ID를 입력하세요." value={loginForm.userid} onChange={handleChange} isInvalid={isInvalidUserid}/>
                        <Form.Control.Feedback type="invalid">{errorMessageUserid}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label><div style={{fontWeight:"bold"}}>Password</div></Form.Label>
                        <Form.Control required type="password" autoComplete="off" name="userpassword" placeholder="비밀번호를 입력하세요." value={loginForm.userpassword} onChange={handleChange} isInvalid={isInvalidPassword}/>
                        <Form.Control.Feedback type="invalid">{errorMessagePassword}</Form.Control.Feedback>
                      </Form.Group>
                      <div className="text-center mt-4">
                        <Button variant="dark" block type="submit">
                          로그인
                        </Button>
                      </div>
                    </Form>
                  </div>
                  <div className="ml-4 mr-4" style={{borderLeft:"1px solid #dddddd", height:"340px"}}></div>
                  <div className="col-6">
                    <HospitalNotice></HospitalNotice>
                  </div>

                </div>
            </div>
      </div>
    </div>
  );
}
export default Hospital;