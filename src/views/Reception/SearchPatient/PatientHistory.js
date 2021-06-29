import { useEffect, useState } from "react";
import Item from "views/components/Item";
import {getAllTreatmentsData,getAllTestsGroupData,getDrugsData} from "../BackEnd/index"
function PatientHistory(props) {
  const[selectedTreatment, setSelectedTreatment] = useState();
  const[treatmentData, setTreatmentData] = useState([])

  const[testGroupData, setTestGroupData] = useState([])
  const[drugsData, setDrugsData] = useState([])

  useEffect(()=>{
    if(props.selectedPatient){
        //히스토리 상세기록 초기화해주기
        setSelectedTreatment(null)
        //해당 환자의 진료기록 불러오기
        var treatmentlist = getAllTreatmentsData(props.selectedPatient)
        setTreatmentData(treatmentlist)
    }
  },[props.selectedPatient])
  
  useEffect(()=>{
    if(selectedTreatment){
      //해당 진료의 테스트데이터 불러오기
      var testlist= getAllTestsGroupData(selectedTreatment.patientid);
      setTestGroupData(testlist);
      //해당 진료의 처방약데이터 불러오기
      var druglist= getDrugsData(selectedTreatment.treatmentid);
      setDrugsData(druglist);
    }
    
  },[selectedTreatment])
  const click =(focusItem) =>{
      setSelectedTreatment(focusItem);
    }
    const treatmentProperty = ["treatmentid","patientid","userid","status","treatmentdate"]  
    const PrescriptionTestsProperty = ["groupcode","groupname"]  
    const PrescriptionDrugsProperty = ["drugid","drugname","description"]  
   
  return (
    <>
      <div className="p-2 pt-3" style={{height:"60vh"}}>
        <div style={{fontSize:"20px", fontWeight:"bold", borderBottom:"1px solid"}}>환자 히스토리</div>
        <div className="mt-3 p-1">
          <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>진료ID</div>
                <div style={{width:"20%"}}>환자번호</div>
                <div style={{width:"20%"}}>의사번호</div>
                <div style={{width:"20%"}}>접수상태</div>
                <div style={{width:"20%"}}>접수시간</div>
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"calc(25vh - 70px)"}} >
                
                  {treatmentData.map((item,index)=>{
                    if(item.patientid===props.selectedPatient.patientid){
                      return(
                        <div key={index}>
                                <Item onClick={click} item ={item} property={treatmentProperty} order={index}/>
                        </div>                         
                        )
                    }
                        
                  })}  
            </div>
        </div>

        <div className="d-flex border mt-4" style={{height:"calc(35vh - 65px)"}}>
           <div className="col-4">
           진료기록
           
           <div className="overflow-auto  justify-content-center border" style={{borderRadius:"15px",height:"calc(35vh - 100px)"}} >
                {selectedTreatment&&selectedTreatment.memo}  
          </div>
          </div>
           <div className="col-4">
            처방검사
           <div className="overflow-auto  justify-content-center border" style={{borderRadius:"15px",height:"calc(35vh - 100px)"}} >
                {selectedTreatment&&testGroupData&&testGroupData.map((item,index)=>{
                  if(selectedTreatment.treatmentid===item.treatmentid){
                    return(
                      <div key={index}>
                              <Item  item ={item} property={PrescriptionTestsProperty}/>
                      </div>                         
                      )
                  }
                })}  
          </div>
          </div>
           <div className="col-4">
             처방약
           <div className="overflow-auto  justify-content-center border" style={{borderRadius:"15px",height:"calc(35vh - 100px)"}} >
                
                {selectedTreatment&&drugsData&&drugsData.map((item,index)=>{
                      return(
                          <div key={index}>
                                  <Item item ={item} property={PrescriptionDrugsProperty}/>
                          </div>                         
                          )
                      })}  
          </div>
           </div>

        </div>

        </div>
      </div>
    </>
  );

  } 
  
  export default PatientHistory;