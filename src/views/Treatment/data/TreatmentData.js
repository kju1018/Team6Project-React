let lastbno = 100;

let data = [];

let date = new Date();
for(var i=1; i<=lastbno; i++) {
  date.setDate(date.getDate()-i);
  data.push({
    treatmentid:i, 
    memo:"메모"+i, 
    treatmentdate:date.toLocaleDateString() + " 진료", 
    userid: i%3 + 1,
    patientid: i%20 + 1
    // state: 
  });
}

export function getTreatments(patientid) {
  const treatments = data.filter(treatment => treatment.patientid === patientid);
  return treatments;
}