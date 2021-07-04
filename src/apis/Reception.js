import axios from "axios";
export function GetReservationList(){
    const result = axios.get("/Reservation/list");
    return result;
}

