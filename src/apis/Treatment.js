import axios from "axios";

const BASE_URL = "http://localhost:8080/";
//treatment관련
export function getAllTreatments(patientid){
    const result = axios.get(BASE_URL + "treatment/treatments/"+patientid);
    return result;
}

//처방하기
export function prescribeTreatment(prescription) {
  const result = axios.post(BASE_URL + "treatment/prescribetreatment", prescription);
  return result;
}


//약 목록 가져오기
export function getStaticDrugs() {
  const result = axios.get(BASE_URL + "treatment/staticdrugs");
  return result;
}

//질병 목록 가져오기
export function getStaticDiagnoses() {
  const result = axios.get(BASE_URL + "treatment/staticdiagnoses");
  return result;
}

//처방 목록 가져오기
export function getPrescriptionList(treatmentid) {
  const result = axios.get(BASE_URL + "treatment/" + treatmentid);
  return result;
}


//환자 목록 가져오기
export function getPatientList() {
  const result = axios.get(BASE_URL + "treatment/getpatientList");
  return result;
}