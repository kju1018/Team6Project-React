import axios from "axios";
const BASEURL = "http://localhost:8080/";

export function testlistByDate(startdate, enddate) {
  const promise = axios.get(BASEURL+"test/patientbytestdate", {params:{startdate, enddate}})
  return promise
}
export function testlistByPatientid(patientid) {
  const promise = axios.get(BASEURL+"test/testreceptionbypatientid", {params: {patientid}})
  return promise
}

export function testlistByReceptionid(testreceptionid) {
  const promise = axios.get(BASEURL+"test/testlistbyreceptionid", {params: {testreceptionid}})
  return promise
}

export function createXray(multipartFormData) {
  console.log(multipartFormData)
  return axios.post("/test/xray", multipartFormData); 
}

export function startTests(checkedList) {
  //console.log(checkedList)
  const tests = [];
  JSON.stringify(checkedList, (key, val) => {
    if (key === 'tests') {
      tests.push(val);
    }
    return val;
  });
  const promise = axios.put(BASEURL + "test/starttest", tests);
  
  return promise;
}

export function startPatient(testreceptionid) {
  console.log(testreceptionid)
  const promise = axios.put(BASEURL+"test/teststartpatient/"+testreceptionid)
  return promise
}

export function cancelTests(checkedList) {
  console.log(checkedList)
  const tests = [];
  JSON.stringify(checkedList, (key, val) => {
    if (key === 'tests') {
      tests.push(val);
    }
    return val;
  });
  const promise = axios.put(BASEURL + "test/canceltest", tests);
  
  return promise;
}

export function cancelPatient(testreceptionid) {
  console.log(testreceptionid)
  const promise = axios.put(BASEURL+"test/testcancelpatient/"+testreceptionid)
  return promise
}

export function finishTests(checkedList) {
  console.log(checkedList)
  const tests = [];
  JSON.stringify(checkedList, (key, val) => {
    if (key === 'tests') {
      tests.push(val);
    }
    return val;
  });
  const promise = axios.put(BASEURL + "test/finishtest", tests);
  console.log(promise)
  return promise;
}

export function finishPatient(testreceptionid) {
  console.log(testreceptionid)
  const promise = axios.put(BASEURL+"test/testfinishpatient/"+testreceptionid)
  return promise
}