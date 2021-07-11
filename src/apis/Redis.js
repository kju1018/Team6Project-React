import axios from "axios";

export function sendRedisMessage(topic, content) {
    return axios.get("/reception/sendRedisMessage", {params:{topic, content}});
  }

export function saveChatting(chatArray) {
  return axios.post("/reception/savechatting",chatArray,{
    headers: {
        'Content-Type': 'application/json'
    }});
}

export function loadChatting() {
  return axios.get("/reception/loadchatting");
}