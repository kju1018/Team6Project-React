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
export function GetTreatmentListBypatientid(patientid){
    const result = axios.get("/reception/treatments/"+patientid);
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
export function PrescriptionTest(patientid){
    const result = axios.get("/reception/prescriptiontest",{
        params:{    
            patientid
        }
    });
    return result;
}
//검사 접수하기
export function ReceptionTest(receptiontestarg){
    const result = axios.post("/reception/receptiontest",receptiontestarg,{
        headers: {
            'Content-Type': 'application/json'
        }});
    return result;
}
// 진료접수하기
export function ReceptionTreatment(treatment){
    const result = axios.post("/reception/receptiontreatment",treatment,{
        headers: {
            'Content-Type': 'application/json'
        }});
    return result;
}

//검사접수 삭제하기
export function DeleteReceptionTest(testreceptionid){
    const result = axios.delete("/reception/removetestreception", {
        data: { 
            testreceptionid
        }
      });
    return result;
}


//진료접수 삭제하기
export function DeleteReceptionTreatment(treatmentid){
    const result = axios.delete("/reception/removereceptiontreatment", {
        data: { 
            treatmentid 
        }
      });
    return result;
}

//그날의 진료접수정보 가져오기
export function GetTreatmentList(){
    const result = axios.get("/reception/treatmentlist");
    return result;
}
//그날의 검사접수정보 가져오기
export function GetTestReceptionList(){
    const result = axios.get("/reception/testreceptionlist");
    return result;
}

//임직원 정보 가져오기(usertype)
export function GetUsersData(usertype){
    const result = axios.get("/user/userlist",{
        params:{    
            usertype
        }
    });
    return result;
}
//임직원 정보 가져오기(userid)
export function GetUserData(userid){
    const result = axios.get("reception/getuser/"+userid);
    return result;
}

