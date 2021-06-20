let lastbno = 300;

let data = [];

for(var i=1; i<=lastbno; i++) {
  data.push({
    treatmentid:i%100 + 1, 
    drugid: i,
    // drugname:
  });
}

export function getPatients(state) {
  const patients = data.filter(patient => patient.state === state);
  return patients;
}