let lastbno = 370;

let data = [];

let diagnoseData = [];

let testData = [];

let packageTestData = [];

for(var i=1; i<=lastbno; i++) {
  data.push({
    treatmentid:i%100 + 21, 
    drugid: "FLEE-Y" + i,
    drugname: "COLCLEAN-S Enem " + i,
    drugquantity: Math.floor(Math.random() * 10)+1,
    drugunit: Math.random() > 0.5 ? "BT" : "TU",
    drugtype: Math.random() > 0.5 ? "내복약" : "외용약"
  });

  diagnoseData.push({
    treatmentid:i%100 + 21,
    diagnosesdataid: "D" + i,
    diagnosisdataname: "기타 비외상성 " + i,
    diagnosisdataename: "Other nontraumatic intracranial haemorrhage " + i
  });

  testData.push({
    treatmentid:i%100 + 21,
    result:Math.random() > 0.5 ? (Math.random() * 10).toFixed(2) : null,
    testdataid: "L2010" + i,
    testname:"WBC" + i,
    testcontainer: Math.random() > 0.5? "EDTA" : "SST",
    groupcode:"L2001" + (i%50),
    groupname:"CBC CBC,PLT,DIFF" + (i%50),
    testunit: Math.random() > 0.5 ? "x10^3/mm3" : "%"
  });

}

let drugData = [];
let diagnosisData = [];
let staticTestData=[];
for(i=0; i< 100; i++) {
  drugData.push({
    drugid: "FLEE-Y" + i,
    drugname: "COLCLEAN-S Enem " + i,
    drugtype: Math.random() > 0.5 ? "내복약" : "외용약",
    drugunit: Math.random() > 0.5 ? "BT" : "TU"
  })

  diagnosisData.push({
    diagnosesdataid: "D" + i,
    diagnosisdataname: "기타 비외상성 " + i,
    diagnosisdataename: "Other nontraumatic intracranial haemorrhage " + i
  })

  staticTestData.push({
    result:"",
    testdataid: "L2010" + i,
    testname:"WBC" + i,
    testcontainer: Math.random() > 0.5? "EDTA" : "SST",
    groupcode:"L2001" + (i%50),
    groupname:"CBC CBC,PLT,DIFF" + (i%50)
  })
}

export function getTreatemntDrugs(treatmentid) {
  const drugs = data.filter(drug => drug.treatmentid === treatmentid);
  return drugs;
}

export function getTretmentDiagnoses(treatmentid) {
  const diagnoses = diagnoseData.filter(diagnose => diagnose.treatmentid === treatmentid);
  return diagnoses;
}

export function getTreatmentTests(treatmentid) {
  const tests = testData.filter(test => test.treatmentid === treatmentid);
  
  return tests;
}

export function getTests() {
  return staticTestData;
}

export function getDrugs() {
  return drugData;
}

export function getDiagnoses() {
  return diagnosisData;
}
