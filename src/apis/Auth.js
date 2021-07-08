import axios from "axios";
export function LoginApi(user){
    const result = axios.post("/Auth/login",JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }});
    return result;
}

export function LogoutApi(){
    axios.get("/Auth/logout")
}

export function join(user) {
    const promise = axios.post("/auth/join", user);
    return promise;
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