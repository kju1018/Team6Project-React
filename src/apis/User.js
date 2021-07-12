import axios from "axios";

export function join(user) {
    const promise = axios.post("/user/join", user);
    return promise;
}

export function getUserList() {
    const promise = axios.get("/user/userlist");
    return promise;
}
