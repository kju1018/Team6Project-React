let lastbno = 120;

let data = [];

let date = new Date();
for(var i=1; i<=20; i++) {
  data.push({
    treatmentid:i, 
    memo: "", 
    treatmentdate:date.toLocaleDateString() + " 진료", 
    userid: i%3 + 1,
    patientid: i%20 + 1,
    state: "진료 대기"
  });
}
date = new Date();
for(var i=21; i<=lastbno; i++) {
  date.setDate(date.getDate()-i);
  data.push({
    treatmentid:i, 
    memo: i%3 ? "메모"+i :"", 
    treatmentdate:date.toLocaleDateString() + " 진료", 
    userid: i%3 + 1,
    patientid: i%20 + 1,
    state: "진료 완료"
  });
}



export function getTreatments(patientid) {
  const treatments = data.filter(treatment => treatment.patientid === patientid);
  return treatments;
}