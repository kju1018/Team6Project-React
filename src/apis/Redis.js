import axios from "axios";

export function sendRedisMessage(topic, content) {
    return axios.get("/reception/sendRedisMessage", {params:{topic, content}});
  }