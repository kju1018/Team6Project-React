import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { updateForm, deleteUser, disableUser, enableUser } from "apis/User";

const errorMsg = {
  password_empty : '비밀번호를 입력해주세요.',
  userid_empty : '아이디를 입력해주세요.',
  err_confirmPassword: '비밀번호확인을 다시 입력해주세요.',
  fail_update:"수정을 실패하였습니다."
}

function UpdateForm(props) {
 
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMesssage] = useState(errorMsg.password_empty);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  useEffect(() => {
    setFormData({
      ...props.updateUser,
      userpassword:"",
      confirmpassword:""
    })
  }, [props.updateUser]);

  const handleSubmit = (event) => {
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//빈칸이 있을경우
      setValidated(true);
      setLoading(false);
      setErrorMesssage(errorMsg.password_empty);
    } else { //빈칸이 없을경우
      if(formData.userpassword !== formData.confirmpassword){//비밀번호, 비밀번호 확인이 다르면
        setIsInvalid(true);
        setErrorMesssage(errorMsg.err_confirmPassword);
        setFormData({
          ...formData,
          confirmpassword:""
        })
        setLoading(false);
      } else {
        
        const response = updateForm(formData);
        response.then((response) => {
          if(response.data.state === "success") {
            setIsInvalid(false);
            props.setIsUpdate(false);
            props.updateShow("수정이 완료 되었습니다.");
          } else {
            setIsInvalid(true);
            setErrorMesssage(errorMsg.fail_update);
          }
        }).catch((error) => {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
        }).finally(() => {
          setLoading(false);

        })
      }
    }
  };

  const deleteUserFun = () => {

    if(window.confirm("직원을 삭제하시겠습니까?") === true){
      setLoading(true);
      const response = deleteUser(formData.userid);
      response.then((response) => {
        if(response.data.state === "success"){
          setIsInvalid(false);
          setLoading(false);
          props.setIsUpdate(false);
          props.updateShow("삭제가 완료되었습니다.");
          props.getUsers();
        } else {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
          setLoading(false);
        }
      }).catch((error) => {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
          setLoading(false);
      })

    }
  }

  const disableUserFun = () => {
    if(window.confirm("직원을 비활성화 시키겠습니까?") === true){
      setLoading(true);
      const response = disableUser(formData.userid);
      response.then((response) => {
        if(response.data.state === "success"){
          setIsInvalid(false);
          setLoading(false);
          props.setIsUpdate(false);
          props.updateShow("직원이 비활성화 되었습니다.");
          props.getUsers();
        } else {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
          setLoading(false);
        }
      }).catch((error) => {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
          setLoading(false);
      })
    }
  }

  const enableUserFun = () => {
    if(window.confirm("직원을 활성화 시키겠습니까?") === true){
      setLoading(true);
      const response = enableUser(formData.userid);
      response.then((response) => {
        if(response.data.state === "success"){
          setIsInvalid(false);
          setLoading(false);
          props.setIsUpdate(false);
          props.updateShow("직원이 활성화 되었습니다.");
          props.getUsers();
        } else {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
          setLoading(false);
        }
      }).catch((error) => {
          setIsInvalid(true);
          setErrorMesssage(errorMsg.fail_update);
          setLoading(false);
      })
    }
  }



  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>아이디</Form.Label>
        <Form.Control required name="userid" type="text" placeholder="User ID" value={formData.userid || ""} readOnly/>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control required name="userpassword" type="password" placeholder="Password" value={formData.userpassword || ""} onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">비밀번호를 입력해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control required name="confirmpassword" type="password" placeholder="Confirm Password" value={formData.confirmpassword || ""} onChange={handleChange} isInvalid={isInvalid}/>
        <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>이름</Form.Label>
        <Form.Control required name="username" type="text" placeholder="User Name" value={formData.username || ""} readOnly/>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>전화번호</Form.Label>
        <Form.Control name="phonenumber" type="test" placeholder="Phone Number" value={formData.phonenumber || ""} readOnly/>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <div>
          <Form.Label>성별</Form.Label>
        </div>
        <Form.Check checked={formData.sex === "남자"} inline label="남자" name="sex" type={"radio"} value="남자" feedback={"성별을 선택해주세요."} readOnly/>
        <Form.Check checked={formData.sex === "여자"} inline label="여자" name="sex" type={"radio"} value="여자" feedback={"성별을 선택해주세요."} readOnly/>
        <Form.Control.Feedback type="invalid">성별을 선택해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <div>
          <Form.Label>직책</Form.Label>
        </div>
        <Form.Check checked={formData.role_authority === "ROLE_DOCTOR"} required inline label="의사" name="role_authority" value="ROLE_DOCTOR" type={"radio"} feedback={"직책을 선택해주세요."} readOnly/>
        <Form.Check checked={formData.role_authority === "ROLE_NURSE"} required inline label="간호사" name="role_authority" value="ROLE_NURSE" type={"radio"} feedback={"직책을 선택해주세요."} readOnly/>
        <Form.Control.Feedback type="invalid">직책을 선택해주세요.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>진료실</Form.Label>
        <Form.Control name="userroom" type="text" placeholder="Treatment Room" value={formData.userroom || ""} onChange={handleChange} readOnly/>
      </Form.Group>

      <Form.Group style={{marginBottom:"10px"}}>
        <Form.Label>상태</Form.Label>
        <Form.Control type="text" value={formData.userenabled ===1 ? "활성화" : "비활성화"} readOnly/>
      </Form.Group>

      <div className="text-right">
        {formData.userenabled === 1 ? 
        <Button className="w-25 mr-3" type="submit" variant="dark">
        {loading === true ? <Spinner className="mr-2" as="span" animation="border" size="sm" role="status"/> : null}
          수정 완료</Button>
        : 
        <Button className="w-25 mr-3" variant="primary" type="button" onClick={enableUserFun}>
        {loading === true ? <Spinner className="mr-2" as="span" animation="border" size="sm" role="status"/> : null}
          활성화</Button>
        }


        {formData.userenabled === 1 ? 
        <Button className="w-25" variant="danger" type="button" onClick={disableUserFun}>
        {loading === true ? <Spinner className="mr-2" as="span" animation="border" size="sm" role="status"/> : null}
          비활성화</Button>
        :
        null
        }
        
      </div>
    </Form>
  );
}

export default UpdateForm;