import { join } from "apis/User";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const errorMsg = {
  password_empty : '비밀번호를 입력해주세요.',
  userid_empty : '아이디를 입력해주세요.',
  err_confirmPassword: '비밀번호확인을 다시 입력해주세요.',
  err_userid: '이미 존재하는 userID 입니다.'
}

function JoinForm(props) { 
  const globalcode = useSelector((state) => {return state.authReducer.codenumber});
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMesssage] = useState(errorMsg.password_empty);
  const [errorMessageID, setErrorMesssageID] = useState(errorMsg.userid_empty);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidID, setIsInvalidID] = useState(false);
  const [isNurse, setIsNurse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userid:"",
    userpassword:"",
    confirmpassword:"",
    username:"",
    phonenumber:"",
    userroom:"",
    sex:"남자",
    role_authority:"ROLE_DOCTOR",
    codenumber:globalcode
  });

  const handleChange = (event) => {
    if(event.target.value === "ROLE_NURSE"){
      setIsNurse(true);
      setFormData((prevData) => {
        return {
          ...prevData,
          userroom:""
        }
      })
      console.log(formData);
    } else {
      setIsNurse(false);
    }
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]:event.target.value
      }
    })
  }

  const handleSubmit = (event) => {
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//빈칸이 있을경우
      setValidated(true);
      setLoading(false);
      setErrorMesssage(errorMsg.password_empty);
      setErrorMesssageID(errorMsg.userid_empty);
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
        setLoading(false);
      } else {
        const response = join(formData);
        response
        .then((response) => {
          const state = response.data.state
          if(state === "success"){
            props.toastShow("직원 등록이 완료되었습니다.");
            setFormData({
              userid:"",
              userpassword:"",
              confirmpassword:"", 
              username:"",
              phonenumber:"",
              userroom:"",
              sex:"남자",
              role_authority:"ROLE_DOCTOR"
            });
            setIsInvalidID(false);
            setErrorMesssageID(errorMsg.userid_empty);
            setIsInvalid(false);
            setErrorMesssage(errorMsg.password_empty);
            props.getUsers();
          } else if(state === "failure"){
            setIsInvalidID(true);
            setErrorMesssageID(errorMsg.err_userid);
            setIsInvalid(false);
            setErrorMesssage(errorMsg.password_empty);
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setLoading(false);
        });
      }
    }
  };


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>아이디</Form.Label>
        <Form.Control required name="userid" type="text" placeholder="User ID" value={formData.userid} onChange={handleChange} isInvalid={isInvalidID}/>
        <Form.Control.Feedback type="invalid">{errorMessageID}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control required name="userpassword" type="password" placeholder="Password" value={formData.userpassword} onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">비밀번호를 입력해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control required name="confirmpassword" type="password" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleChange} isInvalid={isInvalid}/>
        <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>이름</Form.Label>
        <Form.Control required name="username" type="text" placeholder="User Name" value={formData.username} onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">이름을 입력해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>전화번호</Form.Label>
        <Form.Control required name="phonenumber" type="test" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">전화번호를 입력해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <div>
          <Form.Label>성별</Form.Label>
        </div>
        <Form.Check required checked={formData.sex === "남자"} inline label="남자" name="sex" type={"radio"} value="남자" feedback={"성별을 선택해주세요."} onChange={handleChange}/>
        <Form.Check required checked={formData.sex === "여자"} inline label="여자" name="sex" type={"radio"} value="여자" feedback={"성별을 선택해주세요."} onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">성별을 선택해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <div>
          <Form.Label>직책</Form.Label>
        </div>
        <Form.Check checked={formData.role_authority === "ROLE_DOCTOR"} required inline label="의사" name="role_authority" value="ROLE_DOCTOR" type={"radio"} feedback={"직책을 선택해주세요."} onChange={handleChange}/>
        <Form.Check checked={formData.role_authority === "ROLE_NURSE"} required inline label="간호사" name="role_authority" value="ROLE_NURSE" type={"radio"} feedback={"직책을 선택해주세요."} onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">직책을 선택해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>진료실</Form.Label>
        <Form.Control required name="userroom" type="text" placeholder="Treatment Room" value={formData.userroom} onChange={handleChange} readOnly={isNurse}/>
        <Form.Control.Feedback type="invalid">진료실을 입력해주세요.</Form.Control.Feedback>
      </Form.Group>


      <div className="text-right">
        <Button className="w-100" type="submit" variant="dark">
          {loading === true ? <Spinner className="mr-1" as="span" animation="border" size="sm" role="status"/> : null}
            직원 등록</Button>
      </div>
    </Form>

  );
}

export default JoinForm;