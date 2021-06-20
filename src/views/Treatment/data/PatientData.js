let lastbno = 20;

let data = [];

let date = new Date();
date.setDate(date.getDate()-1);

for(var i=1; i<=lastbno; i++) {
  data.push({
    patientid:i, 
    patientname:"환자이름"+i, 
    ssn1:"951018", 
    ssn2:"1111111", 
    sex: i%2===0 ? "남" : "여",
    age:10+i,
    phonenumber: "010-1234-1234", 
    lasttreatment:date.toLocaleDateString(),
    registerday:date.toLocaleDateString(),
    state: i % 3 === 0? "대기" : "완료"
  });
}

export function getPatients(state) {
  const patients = data.filter(patient => patient.state === state);
  return patients;
}