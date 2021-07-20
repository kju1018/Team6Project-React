import axios from "axios";

//공지사항 가져오기
export function getNoticeList() {
    const promise = axios.get("/main/NoticeList");
    return promise;
}

//공지사항 추가
export function noticeUpdate(newBoard){
    const promise = axios.post("/main/noticeUpdate", newBoard);
    return promise;
}

//공지사항 삭제하기
export function deleteNotice(noticeid){
    const promise = axios.delete("/main/delete/" + noticeid);
    return promise;
}

//유저정보 가져오기
export function getUserList() {
    const promise = axios.get("/main/userList");
    return promise;
}

//스케쥴 가져오기
export function getScheduleList(startDate) {
    const promise = axios.get("/main/ScheduleList/" + startDate);
    return promise;
}

//스케줄 등록
export function scheduleUpdate(newBoard) {
    const promise = axios.post("/main/scheduleUpdate", newBoard);
    return promise;
}

//스케줄 삭제
export function deleteSchedule(scheduleid) {
    const promise = axios.delete("/main/scheduleDelete/" + scheduleid);
    return promise;
}