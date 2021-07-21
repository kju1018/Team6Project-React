import axios from "axios";
const BASE_URL = "http://localhost:8080/";
// const BASE_URL ="http://kosa3.iptime.org:50006/";
export function sendRedisMessage(content) {
    content =JSON.stringify(content)
    return axios.get(BASE_URL+"reception/sendRedisMessage", {params:{topic:"/reception", content}});
  }

  export function clearChatting(userid) {
    return axios.get(BASE_URL+"reception/clearchatting/"+userid);
  }

export function saveChatting(userid,chatArray) {
  var chatArrayst = JSON.stringify(chatArray)
  return axios.post(BASE_URL+"reception/savechatting",{userid,chatArray:chatArrayst},{
    headers: {
        'Content-Type': 'application/json'
    }});
}

export function loadChatting(userid) {
  return axios.get(BASE_URL+"reception/loadchatting/"+userid);
}