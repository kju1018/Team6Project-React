import { join } from "apis/User";
import { useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
const errorMsg = {
  'password_empty' : '비밀번호를 입력해주세요.',
  'userid_empty' : '아이디를 입력해주세요.',
  'err_confirmPassword': '비밀번호확인을 다시 입력해주세요.',
  'err_userid':'이미 존재하는 userID 입니다.'
}
function Members(props) {

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMesssage] = useState(errorMsg.password_empty);
  const [errorMessageID, setErrorMesssageID] = useState(errorMsg.userid_empty);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidID, setIsInvalidID] = useState(false);
  const [formData, setFormData] = useState({
    userid:"",
    userpassword:"",
    confirmpassword:"",
    username:"",
    phonenumber:"",
    sex:"남자",
    role_authority:"ROLE_DOCTOR"
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit = (event) => {

    const form = event.currentTarget;
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//빈칸이 있을경우
      setValidated(true);
    } else { //빈칸이 없을경우
      if(formData.userpassword !== formData.confirmpassword){//비밀번호, 비밀번호 확인이 다르면
        setIsInvalidID(false);
        setErrorMesssageID(errorMsg.userid_empty);
        setIsInvalid(true);
        setErrorMesssage(errorMsg.err_confirmPassword);
        setFormData({
          ...formData,
          confirmpassword:""
        })
      } else {
        const response = join(formData);
        response
        .then((response) => {
          const state = response.data.state
          if(state === "success"){
            alert("직원 등록이 완료 되었습니다.");
            setFormData({
              userid:"",
              userpassword:"",
              confirmpassword:"",
              username:"",
              phonenumber:"",
              sex:"남자",
              role_authority:"ROLE_DOCTOR"
            });
            setIsInvalidID(false);
            setErrorMesssageID(errorMsg.userid_empty);
            setIsInvalid(false);
            setErrorMesssage(errorMsg.password_empty);
          } else if(state === "failure"){
            console.log(state);
            setIsInvalidID(true);
            setErrorMesssageID(errorMsg.err_userid);
            setIsInvalid(false);
            setErrorMesssage(errorMsg.password_empty);
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  };

  return (
    <>
      <div className="row ml-0 mr-0" style={{height:"100vh"}}>
        <div className="col h-100">
          <div className="border border-dark pl-3 pr-3" style={{height:"96vh", marginBottom:"2vh",  marginTop:"2vh" , backgroundColor:"#FFFFFF"}}>
            <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-person-lines-fill"></i></div><div className="d-flex align-items-center">직원 목록</div></div>
            <div className="bg-secondary" style={{height:"calc(100% - 50px)"}}></div>
          </div>
        </div>

        <div className="col h-100">
          <div className="border border-dark pl-3 pr-3" style={{height:"96vh", marginBottom:"2vh",  marginTop:"2vh" , backgroundColor:"#FFFFFF"}}>
            <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-person-plus-fill"></i></div><div className="d-flex align-items-center">직원 등록</div></div>
            <div className="pt-4" style={{height:"calc(100% - 50px)"}}>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>아이디</Form.Label>
                  <Form.Control required name="userid" type="text" placeholder="User ID" value={formData.userid} onChange={handleChange} isInvalid={isInvalidID}/>
                  <Form.Control.Feedback type="invalid">{errorMessageID}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control required name="userpassword" type="password" placeholder="Password" value={formData.userpassword} onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">비밀번호를 입력해주세요.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>비밀번호 확인</Form.Label>
                  <Form.Control required name="confirmpassword" type="password" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleChange} isInvalid={isInvalid}/>
                  <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>이름</Form.Label>
                  <Form.Control required name="username" type="text" placeholder="User Name" value={formData.username} onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">이름을 입력해주세요.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <Form.Label>전화번호</Form.Label>
                  <Form.Control required name="phonenumber" type="test" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">전화번호를 입력해주세요.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <div>
                    <Form.Label>성별</Form.Label>
                  </div>
                  <Form.Check required checked={formData.sex === "남자"} inline label="남자" name="sex" type={"radio"} value="남자" feedback={"성별을 선택해주세요."} onChange={handleChange}/>
                  <Form.Check required checked={formData.sex === "여자"} inline label="여자" name="sex" type={"radio"} value="여자" feedback={"성별을 선택해주세요."} onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">성별을 선택해주세요.</Form.Control.Feedback>
                </Form.Group>
 
                <Form.Group >
                  <div>
                    <Form.Label>직책</Form.Label>
                  </div>
                  <Form.Check checked={formData.role_authority === "ROLE_DOCTOR"} required inline label="의사" name="role_authority" value="ROLE_DOCTOR" type={"radio"} feedback={"직책을 선택해주세요."} onChange={handleChange}/>
                  <Form.Check checked={formData.role_authority === "ROLE_NURSE"} required inline label="간호사" name="role_authority" value="ROLE_NURSE" type={"radio"} feedback={"직책을 선택해주세요."} onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">직책을 선택해주세요.</Form.Control.Feedback>
                </Form.Group>

                <div className="text-right">
                  <Button className="w-100" type="submit">Submit form</Button>
                </div>
              </Form>
                
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Members;