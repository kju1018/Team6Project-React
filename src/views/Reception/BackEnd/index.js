// 정적 데이터 모음



//환자 정보
let patientslist=[];
for(var i=1; i<10; i++){
    const TR = {patientid:"patientid"+i, patientname:"name"+i, sex:i%2?"남자":"여자",age:i,ssn1:"950328",ssn2:"111111"
    ,phonenumber:"01024967236",registerday:new Date().toLocaleDateString(),lasttreatment:new Date().toLocaleDateString() } 
    patientslist.push(TR);
}
//전체 환자 가져오기
export function getAllPatientsData(){
    return patientslist;
}
//특정 환자 가져오기
export function getPatientData(patient_id){
    return patientslist.filter((item)=>{return item.patientid===patient_id})[0]
    
}
//환자 등록
export function insertPatientData(patient){
    const i = patientslist.length+1;
    patientslist.push({patientid:"patientid"+i, patientname:patient.patientname, sex:patient.sex,
    age:patient.age,ssn1:patient.ssn1,ssn2:patient.ssn2
    ,phonenumber:patient.phonenumber,registerday:new Date().toLocaleDateString(),lasttreatment:"-"})
    return "patient"+i;
}
//환자 수정
export function updatePatientData(patient){
    var index = patientslist.findIndex((item)=>(item.patientid===patient.patientid))
    patientslist.splice(index,1,{patientid:index,...patient})
}



//병원임직원정보
let userslist=[];
for(var i=1; i<3; i++){
    const TR = {userid:"userid"+i, username:"name"+i,userroom:"room"+i,role_authority:"role_doctor",userpassword:"12345",phonenumber:"01024967236",userenabled:"1" } 
    userslist.push(TR);
}
//진료정보
let treatmentslist=[];
for(var i=1; i<10; i++){
    const TR = {treatmentid:"treatmentid"+i, memo:"memo"+i,treatmentdate:new Date().toLocaleDateString(),patientid:"patientid"+i,userid:"userid"+i,status:"대기" } 
    treatmentslist.push(TR);
}
//진료정보 가져오기
export function getAllTreatmentsData(){
    return treatmentslist;
}

//약데이터
let drugslist=[];
for(var i=1; i<10; i++){
    const TR = {treatmentid:"treatmentid"+i,drugid:"drugid"+i,description:"description"+i } 
    drugslist.push(TR);
}
drugslist.push({treatmentid:"treatmentid"+1,drugid:"drugid"+2,description:"description"+1 });
//해당 진료의 처방된 약데이터 가져오기
export function getDrugsData(treatment_id){
    var prescriptionlist = drugslist.filter((drugs)=>(drugs.treatmentid===treatment_id))
    return prescriptionlist;
}


//예약정보
let reservationslist=[];
for(var i=1; i<10; i++){
    const TR = {reservationid:"reservationid"+i,
     reservationdate:new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),8+i,0),
    patientid:"patientid"+i,status:"대기",type:i%2===0?"진료":"검사" } 
    reservationslist.push(TR);
}
//예약 가져오기
export function getAllReservationsData(){
    return reservationslist;
}
//특정 예약 가져오기
export function getReservationData(reservation_id){
    return reservationslist.filter((item)=>{return item.reservationid===reservation_id})[0]
    
}
//예약 등록
export function insertReservationData(reservation,selectedtestlist){
    const i = reservationslist.length+1;
    reservationslist.push({reservationid:"reservationid"+i, reservationdate:reservation.reservationdate
    ,patientid:reservation.patientid,status:reservation.status,type:reservation.type } )
    if(reservation.type==="검사"){
        // 예약타입이 검사일때 검사테이블 돌면서 선택된 그룹코드들과 같은 검사들의 예약id에 해당 예약id 넣어줌+ 환자아이디 같아야하고 해당 검사의 상태가 접수대기 여야함
        for(var c=0; c<testslist.length; c++){
            for(var j=0; j<selectedtestlist.length; j++){
                if(selectedtestlist[j].groupcode===testslist[c].groupcode && reservation.patientid===testslist[c].patientid && testslist[c].status==="접수대기" ){
                    testslist[c].reservationid = "reservationid"+i;
                }
    
            }
        }
    }
    return i;
}
//예약 수정
export function updateReservationData(reservation){
    var index = reservationslist.findIndex((item)=>(item.reservationid===reservation.reservationid))
    reservationslist.splice(index,1,{reservationid:index,...reservation})
}





//검사 접수 정보
let testreceptionslist=[];
for(var i=1; i<5; i++){
    const TR = {testreceptionid:"testreceptionid"+i, testdate:new Date().toLocaleDateString(),patientid:"patientid"+i,status:"대기"} 
    testreceptionslist.push(TR);
}
//검사 접수 가져오기
export function getAllTestsReceptionData(){
    return testreceptionslist;
}


//검사 정보
let testslist=[];
for(var i=1; i<4; i++){
    const TR = {groupcode:"groupcode"+i,groupname:"groupname"+i,result:"result"+i,status:"접수대기",testreceptionid:i,testdataid:"testdata"+i,reservationid:0,treatmentid:"treatmentid"+i,patientid:"patientid"+i,userid:"userid"+i} 
    testslist.push(TR);
}
const TR = {groupcode:"groupcode"+1,groupname:"groupname"+1,result:"result"+1,status:"접수대기",testreceptionid:1,testdataid:"testdata"+1,reservationid:0,treatmentid:"treatmentid"+1,patientid:"patientid"+1,userid:"userid"+1} 
testslist.push(TR);

//특정 환자의 처방검사 그룹가져오기
export function getAllTestsGroupData(patient_id){
   testslist.sort(function(a, b) {
        if(a.groupcode<b.groupcode){
            return -1;
        }
        else if(a.groupcode>b.groupcode){
            return 1;
        }else{
            return 0;    
        }
    });
    //중복되는 그룹코드 제거하여 그룹코드와 그룹이름 객체배열 반환
    var grouplist=[]
    const testslist2 = testslist.filter((test)=>(test.patientid===patient_id))
    if(testslist2.length===0){return null}
    var tmp = {groupcode:testslist2[0].groupcode, groupname:testslist2[0].groupname,treatmentid:testslist2[0].treatmentid };
    grouplist.push(tmp);
    for(var i=1; i<testslist2.length; i++){
        if(testslist2[i].groupcode!==tmp.groupcode){
            var tmps = {groupcode:testslist2[i].groupcode, groupname:testslist2[i].groupname,treatmentid:testslist2[i].treatmentid}
            grouplist.push(tmps)
        }
    }
    return grouplist;
}


