import axios from "axios";
const BASEURL = "http://localhost:8080/";

export function testlistByDate(startdate, enddate) {
  const promise = axios.get(BASEURL+"test/patientbytestdate", {params:{startdate, enddate}})
  return promise
}
export function testlistByPatientid() {
  const promise = axios.get(BASEURL+"test/testreceptionbypatientid")
  return promise
}

export function testlistByReceptionid(testreceptionid) {
  const promise = axios.get(BASEURL+"test/testlistbyreceptionid/" + testreceptionid)
  console.log(promise.data);
}


// export function testReceptions() {
//   const [testreception, setTestrecception] = useState([]);

//   useEffect(()=>{
//     const promise = axios.get(BASEURL+"/test/patientbytestdate")
//     console.log("ddd" + promise)
//   })
 
// }

// export function waitingPatient() {
//   const patients = data.filter(patient => patient.state === "대기중");
//   return patients;
// }
// export function progressPatient() {
//   const patients = data.filter(patient => patient.state === "진행중");
//   return patients;
// }
// export function completePatient() {
//   const patients = data.filter(patient => patient.state === "완료");
//   return patients;
// }