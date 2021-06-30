import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {CreateSetAuthToken, CreateSetUid} from "redux/auth-rducer"
import {LoginApi} from "apis/Auth"
import { addAuthHeader } from "apis/axiosConfig";
function Login(props){

    const [uid, setUid] = useState("");
    
    const [upassword, setUpassword] = useState("");

    const onChangeUid = (event) =>{
        setUid(event.target.value)
    }
    const onChangeUpassword = (event) =>{
        setUpassword(event.target.value)
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const login = async() =>{
        try{
            const user = {uid,upassword};
            const result = await LoginApi(user);
            console.log(result.data);
            if(result.data.status==="success"){
                sessionStorage.setItem("uid",result.data.uid)
                sessionStorage.setItem("authToken",result.data.authToken) 
                dispatch(CreateSetUid(result.data.uid))
                dispatch(CreateSetAuthToken(result.data.authToken))
                addAuthHeader(result.data.authToken);
                history.push("/ChattingMenu")
            }else{
                setUid("")
                setUpassword("")
                alert(result.data.status)
            }
        }catch(err){
            console.log(err)
        }       
    }

    return(
    <div className="container text-center">
        <label className="text-center font-weight-bold">로그인</label>

        <div className="form-group row justify-content-center">
            <label htmlFor="uid" className="col-sm-2 col-form-label">User ID</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" name="uid" value={uid} onChange={onChangeUid} />
            </div>
        </div>
        <div className="form-group row justify-content-center">
            <label htmlFor="upassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-6">
              <input type="Password" className="form-control" name="upassword" value={upassword} onChange={onChangeUpassword}/>
            </div>
        </div>  
        <button className="btn btn-success btn-sm"  onClick={login} >로그인</button>
    </div>
    );
}
export default Login;