let data = [];

let date = new Date();


for(var i=1; i<=4; i++) {
  date.setDate(date.getDate()-i);
  data.push({
    patientid:i, 
    patientname:"환자이름"+i, 
    ssn1:"931127", 
    ssn2:"1111111", 
    sex: "여",
    age:10+i,
    phonenumber: "010-1234-1234", 
    lasttreatment:(new Date).toLocaleDateString(),
    registerday:date.toLocaleDateString(),
    state: "대기중"
  });
}

for(var i=1; i<=3; i++) {
  date.setDate(date.getDate()-i);
  data.push({
    patientid:4+i, 
    patientname:"환자이"+i, 
    ssn1:"931127", 
    ssn2:"1111111", 
    sex: "남",
    age:10+i,
    phonenumber: "010-1234-1234", 
    lasttreatment:(new Date).toLocaleDateString(),
    registerday:date.toLocaleDateString(),
    state: "완료"
  });
}
for(var i=1; i<=2; i++) {
  date.setDate(date.getDate()-i);
  data.push({
    patientid:7+i, 
    patientname:"환자"+i, 
    ssn1:"931127", 
    ssn2:"1111111", 
    sex: "남",
    age:10+i,
    phonenumber: "010-1234-1234", 
    lasttreatment:(new Date).toLocaleDateString(),
    registerday:date.toLocaleDateString(),
    state: "진행중"
  });
}

let testreceptions =[];  //-------------------------------testrecption
for(var i=1; i<=10; i++) {
  testreceptions.push({
    testreceptionid:10+i,
    patientid: i,
    testdate: '2020.04.0'+i
  })
}
for(var i=1; i<=2; i++) {
  testreceptions.push({
    testreceptionid:20+i,
    patientid: 1,
    testdate: '2020.04.1'+i
  })
}
for(var i=1; i<=2; i++) {
  testreceptions.push({
    testreceptionid:30+i,
    patientid: 4,
    testdate: '2020.04.1'+i
  })
}

let tests =[];  //-------------------------------test
for(var i=1; i<=10; i++) {
  tests.push({
    testreceptionid:10+i,
    treatmentid:50+i,
    patientid: i,
    groupcode:"WDES14"+i,
    testcode:"처방코드"+i,
    state:"",
    userid:"1423"
  })
}

let testdata = [];
for(var i=0; i<=300; i++) {
  testdata.push({
    testdataid: "test"+i,
    testdataname: "검사명"+i,
    testcontainer: "검사용기"+i,
    groupcode: "그룹코드"+(i%50),
    groupname: "그룹코드명",
    result: ""
  })
}


export function testList() {
  return tests;
}

export function testDate() {
  
  return testreceptions;
}

export function waitingPatient() {
  const patients = data.filter(patient => patient.state === "대기중");
  return patients;
}
export function progressPatient() {
  const patients = data.filter(patient => patient.state === "진행중");
  return patients;
}
export function completePatient() {
  const patients = data.filter(patient => patient.state === "완료");
  return patients;
}


export function getAllPatient() {
  return data;
}