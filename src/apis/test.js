import axios from "axios";
const BASEURL = "http://localhost:8080/";

export function testlistByDate(startdate, enddate) {
  const promise = axios.get(BASEURL+"test/patientbytestdate", {params:{startdate, enddate}})
  return promise
}
export function testlistByPatientid(patientid) {
  console.log(patientid)
  const promise = axios.get(BASEURL+"test/testreceptionbypatientid", {params: {patientid}})
  return promise
}

export function testlistByReceptionid(testreceptionid) {
  const promise = axios.get(BASEURL+"test/testlistbyreceptionid", {params: {testreceptionid}})
  return promise
}
