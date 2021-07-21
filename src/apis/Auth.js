import axios from "axios";
export function LoginApi(user){
    const result = axios.post("/auth/login",user);
    return result;
}

export function LogoutApi(){
    axios.get("/Auth/logout")
}

export function test(){
    axios.get("/Auth/test", {
        headers: {
            'Content-Type': 'application/json'
        }});
}

export function test2(){
    axios.get("/Auth/test2", {
        headers: {
            'Content-Type': 'application/json'
        }});
}