import { getUserList } from "apis/User";
import { useEffect, useState } from "react";
import { Col, Row, Toast } from "react-bootstrap";
import JoinForm from "./JoinForm";
import UpdateForm from "./UpdateForm";
function Members(props) {
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async() => {
    const response = await getUserList();
    setUserList(response.data);
  }

  const [updateUser, setUpdateUser] = useState({});

  const update = (selectUser) => {
    setUpdateUser(selectUser);
    setIsUpdate(true);
  }

  const completeUpdate = (message) => {
    setToastMessage(message);
    setShow(true);
  }

  const closeShow = () => {
    setShow(false)
    setToastMessage(""); 
  }

  return (
    <>
      <div className="row ml-0 mr-0" style={{height:"100vh"}}>
        <div className="col h-100">
          <div className="border border-dark pl-3 pr-3" style={{height:"96vh", marginBottom:"2vh",  marginTop:"2vh" , backgroundColor:"#FFFFFF"}}>
            <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-person-lines-fill"></i></div><div className="d-flex align-items-center">직원 목록</div></div>
            <div className="p-4" style={{height:"calc(100% - 50px)"}}>
              <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
                <div style={{width:"10%"}}></div>
                <div style={{width:"12%"}}>직원 아이디</div>
                <div style={{width:"15%"}}>직원명</div>
                <div style={{width:"18%"}}>전화번호</div>
                <div style={{width:"10%"}}>진료실</div>
                <div style={{width:"15%"}}>직책</div>
                <div style={{width:"10%"}}>상태</div>
                <div style={{width:"10%"}}></div>
              </div>
              <div className="overflow-auto border" style={{height:"calc(100% - 40px"}}>
                {userList != null &&
                userList.map((user) => {
                  return (
                    <div key={user.userid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"60px", fontWeight:"bold"}}>
                      <div style={{width:"10%"}}>
                        {user.sex === "남자" ? 
                          <img src="/doctor2.png" width="30" height="30"/> :
                          <img src="/doctor3.png" width="30" height="30"/>
                        }  
                      </div>
                      <div style={{width:"12%"}}>{user.userid}</div>
                      <div style={{width:"15%"}}>{user.username}</div>
                      <div style={{width:"18%"}}>{user.phonenumber}</div>
                      <div style={{width:"10%"}}>{user.userroom}</div>
                      <div style={{width:"15%"}}>
                        {user.role_authority === "ROLE_DOCTOR" ? "의사" : "간호사"}
                      </div>
                      <div style={{width:"10%"}}>
                        {user.userenabled === 1 ? "활성화" : "비활성화"}
                      </div>
                      <div style={{width:"10%"}}><button className="btn btn-sm btn-outline-secondary" onClick={() => {update(user)}}>수정</button></div>
                    </div>
                  )
                })
                }
              </div>

            </div>
          </div>
        </div>

        <div className="col h-100">
          <div className="border border-dark pl-3 pr-3" style={{height:"96vh", marginBottom:"2vh",  marginTop:"2vh" , backgroundColor:"#FFFFFF"}}>
            <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-person-plus-fill"></i></div><div className="d-flex align-items-center">
                {isUpdate == false ? "직원 등록" : "직원 수정"}</div></div>
            <div className="pt-4" style={{height:"calc(100% - 50px)"}}>
              {isUpdate == false ? 
              <JoinForm toastShow={completeUpdate} getUsers={getUsers}/> 
              : 
              <UpdateForm updateUser={updateUser} getUsers={getUsers} setIsUpdate={setIsUpdate} updateShow={completeUpdate}></UpdateForm> }
                
            </div>
          </div>
        </div>

        <div style={{position: "absolute", bottom: "40px", right: "30px"}}>
          <Row>
            <Col style={{width:"400px"}}>
              <Toast onClose={closeShow} show={show} delay={3000} autohide>
                <Toast.Header style={{backgroundColor:"#1B296D"}}>
                  <strong className="mr-auto" style={{color:"white"}}>Message</strong>
                  <small>complete</small>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
              </Toast>
            </Col>
          </Row>
        </div>

      </div>
    </>
  );
}

export default Members;