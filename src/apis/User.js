import axios from "axios";

export function join(user) {
    const promise = axios.post("/user/join", user);
    return promise;
}
