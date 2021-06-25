let lastbno = 370;

let data = [];

let diagnoseData = [];

let testData = [];

let packageTestData = [];

for(var i=1; i<=lastbno; i++) {
  data.push({
    treatmentid:i%100 + 21, 
    drugid: "G" + i,
    drugname: "약 " + i,
    drugquantity: i % 5,
    drugunit: Math.random() > 0.5 ? "BT" : "TU",
    drugtype: Math.random() > 0.5 ? "내복약" : "외용약"
  });

  diagnoseData.push({
    treatmentid:i%100 + 21,
    diagnosesdataid: "D" + i,
    diagnosedataname: "상병명 " + i
  });

  testData.push({
    treatmentid:i%100 + 21,
    result:"검사 결과" + i,
    testdataid: "처방 코드" + i,
    testname:"검사 이름" + i,
    testcontainer: i%2===0? "EDTA" : "SST",
    groupcode:"그룹코드" + (i%50),
    groupname:"그룹 이름" + (i%50)
  });

  packageTestData.push({
    treatmentid:i%100 + 21,
    groupcode:"그룹코드" + (i%50),
    groupname:"그룹 이름" + (i%50)
  })
}

let drugData = [];
let diagnosisData = [];
let staticTestData=[];
for(i=0; i< 100; i++) {
  drugData.push({
    drugid: "G" + i,
    drugname: "약 " + i,
    drugtype: Math.random() > 0.5 ? "내복약" : "외용약",
    drugunit: Math.random() > 0.5 ? "BT" : "TU"
  })

  diagnosisData.push({
    diagnosesdataid: "D" + i,
    diagnosisdataname: "상병명 " + i
  })

  staticTestData.push({
    result:"",
    testdataid: "처방 코드" + i,
    testname:"검사 이름" + i,
    testcontainer: i%2===0? "EDTA" : "SST",
    groupcode:"그룹코드" + (i%50),
    groupname:"그룹 이름" + (i%50)
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

export function getPackageTests(treatmentid) {
  const tests = testData.filter(test => test.treatmentid === treatmentid);
  console.log(tests);
  const set = new Set();

  const uniqueArr = [...set];

}


export function getDrugs() {
  return drugData;
}

export function getDiagnoses() {
  return diagnosisData;
}

export function getTests() {
  return staticTestData;
}