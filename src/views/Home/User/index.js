import { useEffect, useState } from "react";
import { getUserList } from "apis/Main";
import "./scrollbar2.css";

function User(props){

  const [UserList, setUserList] = useState([]);

  const work = async() => {
    const response = await getUserList("전체");    
    setUserList(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    work();
  },[])
  
  return(    
    <>
    <div className="scrollbar" id="style-7">
      <div className="force-overflow-auto">
      <table className="table table-hover">
        <thead className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
        <tr>
          <th scope="col">ROOM</th>
          <th scope="col">NAME</th>
          <th scope="col">PHONE</th>
          <th scope="col">SEX</th>
        </tr>
        </thead>
        <tbody style={{backgroundColor:"white"}}>
          {UserList.length != 0 &&
          UserList.map((board) => {
            return(
                <tr>
                  <th style={{width:"100px"}}>{board.userroom}</th>
                  <th style={{width:"110px"}}>{board.username}</th>
                  <th style={{width:"210px"}}>{board.phonenumber}</th>
                  <th>{board.sex}</th>
                </tr>
            )
          })}
        </tbody>
      </table>
      </div>
   </div>
    </>
  )
}

export default User;