let lastbno = 370;

let data = [];

let diagnoseData = [];

let testData = [];

for(var i=1; i<=lastbno; i++) {
  data.push({
  treatmentid:i%100 + 21, 
    drugid: "G" + i,
    drugname: "약 " + i,
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
    groupcode:"그룹코드" + (i%50),
    groupname:"그룹 이름" + (i%50)
  })
}

export function getTreatemntDrugs(treatmentid) {
  const drugs = data.filter(drug => drug.treatmentid === treatmentid);
  return drugs;
}

export function getDiagnoses(treatmentid) {
  const diagnoses = diagnoseData.filter(diagnose => diagnose.treatmentid === treatmentid);
  return diagnoses;
}

export function getTests(treatmentid) {
  const tests = testData.filter(test => test.treatmentid === treatmentid);
  return tests;
}

export function getPackageTests(treatmentid) {
  const tests = testData.filter(test => test.treatmentid === treatmentid);
  const dupArr = [1, 2, 3, 1, 2];

const set = new Set(dupArr);

const uniqueArr = [...set];
}
