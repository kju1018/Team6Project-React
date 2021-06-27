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
    drugquantity: Math.floor(Math.random() * 10),
    drugunit: Math.random() > 0.5 ? "BT" : "TU",
    drugtype: Math.random() > 0.5 ? "내복약" : "외용약"
  });

  diagnoseData.push({
    treatmentid:i%100 + 21,
    diagnosesdataid: "D" + i,
    diagnosisdataname: "상병명 " + i,
    diagnosisdataename: "Other nontraumatic intracranial haemorrhage " + i
  });

  testData.push({
    treatmentid:i%100 + 21,
    result:Math.random() > 0.5 ? "검사 결과" + i : null,
    testdataid: "처방 코드" + i,
    testname:"검사 이름" + i,
    testcontainer: Math.random() > 0.5? "EDTA" : "SST",
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
for(i=0; i< 300; i++) {
  drugData.push({
    drugid: "G" + i,
    drugname: "약 " + i,
    drugtype: Math.random() > 0.5 ? "내복약" : "외용약",
    drugunit: Math.random() > 0.5 ? "BT" : "TU"
  })

  diagnosisData.push({
    diagnosesdataid: "D" + i,
    diagnosisdataname: "상병명 " + i,
    diagnosisdataename: "Other nontraumatic intracranial haemorrhage " + i
  })

  staticTestData.push({
    result:"",
    testdataid: "처방 코드" + i,
    testname:"검사 이름" + i,
    testcontainer: Math.random() > 0.5? "EDTA" : "SST",
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
  
  // let grouped = Object.values(
  //   tests.reduce((r, o) => {
  //       if(!r[o.groupcode]){
  //         r[o.groupcode] = {};
  //         r[o.groupcode][o.groupcode] = o.groupcode;
  //         r[o.groupcode][o.groupname] = o.groupname;
  //         r[o.groupcode].tests = []
  //         r[o.groupcode].tests.push(o)
  //       } else {
  //         r[o.groupcode].tests.push(o);
  //       }
  //         return r;
  //     }, {})
  // );
  // grouped.map((item) => {
  //   item.tests.map((test) => {
  //     console.log(test);
  //     return test;
  //   });
  //   console.log(item);
  //   return item;
  // });
  // console.log(grouped);
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
