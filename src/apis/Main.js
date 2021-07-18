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