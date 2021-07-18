import { useEffect, useState } from "react";
import { getUserList } from "apis/Main";

function User(props){

  const [UserList, setUserList] = useState([]);
  const [board, setBoard] = useState({});

  const work = async() => {
    const response = await getUserList();    
    setUserList(response.data);
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
        <tr class="text-center">
          <th scope="col">Room</th>
          <th scope="col">DOCTOR</th>
          <th scope="col">PHONE</th>
          <th scope="col">SEX</th>
        </tr>
        </thead>
        <tbody>
          {UserList.length != 0 &&
          UserList.map((board) => {
            return(
                <tr>
                  <th style={{width:"100px"}}>{board.userroom}</th>
                  <th style={{width:"100px"}}>{board.username}</th>
                  <th style={{width:"200px"}}>{board.phonenumber}</th>
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