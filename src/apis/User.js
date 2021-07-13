import axios from "axios";

export function join(user) {
    const promise = axios.post("/user/join", user);
    return promise;
}

export function getUserList() {
    const promise = axios.get("/user/userlist");
    return promise;
}

export function updateForm(user) {
    const promise = axios.post("/user/update", user);
    return promise;
}

export function deleteUser(userid) {
    const promise = axios.delete("/user/delete/" + userid);
    return promise;
}

export function disableUser(userid) {
    const promise = axios.put("/user/disable/" + userid);
    return promise;
}

export function enableUser(userid) {
    const promise = axios.put("/user/enable/" + userid);
    return promise;
}

 