import axios from "axios";

//예약정보 가져오기
export function GetReservationList(){
    const result = axios.get("/reception/reservationlist");
    return result;
}
//예약정보 등록하기
export function RegisterReservation(reservation, testlist){
    const result = axios.post("/reception/registerreservation",[reservation,testlist],{
        headers: {
            'Content-Type': 'application/json'
        }});
    return result;
}
//예약정보 삭제하기
export function RemoveReservation(reservationid){
    const result = axios.delete("/reception/removereservation", {
        data: { 
          reservationid 
        }
      });
    return result;
}



//환자정보가져오기
export function GetPatientList(){
    const result = axios.get("/reception/patientlist");
    return result;
}
//환자등록하기
export function RegisterPatient(patient){
    const result = axios.post("/reception/registerpatient",patient,{
        headers: {
            'Content-Type': 'application/json'
        }});
    return result;
}
//환자수정하기
export function UpdatePatient(patient){
    const result = axios.put("/reception/updatepatient",patient,{
        headers: {
            'Content-Type': 'application/json'
        }});
    return result;
}

