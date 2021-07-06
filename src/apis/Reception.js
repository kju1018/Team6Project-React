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
//예약정보 수정하기
export function UpdateReservation(reservation){
    let result = axios.put("/reception/updatereservation",reservation);
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

//환자의 진료정보 가져오기
export function GetTreatmentList(patientid){
    const result = axios.get("/treatment/treatments/"+patientid);
    return result;
}

//환자의 진료상세정보 가져오기
export function GetTreatmentDetail(treatmentid){
    const result = axios.get("/reception/treatmentdetail",{
        params:{    
            treatmentid
        }
    });
    return result;
}

//처방받은 검사데이터 가져오기
export function GetPrescriptionTestData(patientid){
    const result = axios.get("/reception/test",{
        params:{    
            patientid
        }
    });
    return result;
}