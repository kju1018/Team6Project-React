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

//검사 목록 가져오기
export function getStaticTests() {
  const result = axios.get(BASE_URL + "treatment/statictests");
  return result;
}

//처방 목록 가져오기
export function getPrescriptionList(treatmentid) {
  const result = axios.get(BASE_URL + "treatment/getprescription/" + treatmentid);
  return result;
}

//실시간을 위해 테스트 리스트 가져오기
export function getTestList(treatmentid) {
  const result = axios.get(BASE_URL + "treatment/gettestlist/" + treatmentid);
  return result;
}

//환자 목록 가져오기
export function getPatientList() {
  const result = axios.get(BASE_URL + "treatment/getpatientlist");
  return result;
}

//
export function getPatient(patientid) {
  const result = axios.get(BASE_URL + "treatment/getpatient/"+patientid);
  return result;
}

export function getTestImgs(treatmentid, testdataid) {
  const result = axios.get(BASE_URL + "treatment/getimgList", {params: {treatmentid, testdataid}});
  return result;
}