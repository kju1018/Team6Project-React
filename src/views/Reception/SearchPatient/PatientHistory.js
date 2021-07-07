import { GetTreatmentList,GetTreatmentDetail } from "apis/Reception";
import { useEffect, useState } from "react";
import Item from "views/components/Item";
function PatientHistory(props) {
  const[selectedTreatment, setSelectedTreatment] = useState();
  const[treatmentData, setTreatmentData] = useState([])

  const[testData, setTestData] = useState([])
  const[drugsData, setDrugsData] = useState([])
  const[diagnosesData, setDiagnosesData] = useState([])
  useEffect(()=>{
    if(props.selectedPatient.patientid){
        //히스토리 상세기록 초기화해주기
        setSelectedTreatment(null)
        //해당 환자의 진료기록 불러오기
        GetTreatmentList(props.selectedPatient.patientid).then((result)=>{
          setTreatmentData(result.data)
        })
        
    }
  },[props.selectedPatient])
  
  useEffect(()=>{
    if(selectedTreatment){
      GetTreatmentDetail(selectedTreatment.treatmentid).then((result)=>{
        console.log(result.data.treatmentdetail)
        //데이터 배열의 첫번째가 진단, 두번째가 약, 세번째가 테스트 그룹임
        setDiagnosesData(result.data.treatmentdetail[0])
        setDrugsData(result.data.treatmentdetail[1]);
        setTestData(result.data.treatmentdetail[2]);
      })
    }
    
  },[selectedTreatment])
  const click =(focusItem) =>{
      setSelectedTreatment(focusItem);
    }
    const treatmentProperty = ["treatmentid","patientid","userid","status","treatmentdate"]  
   
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
           진단기록
           <div className="overflow-auto  justify-content-center border" style={{height:"calc(35vh - 100px)"}} >
          
                {selectedTreatment&&diagnosesData&&diagnosesData.map((item,index)=>{
                      return(
                          <div className="row m-0 border-bottom text-center" key={index} style={{fontSize:"0.8em"}}>
                            <div className="col-3 p-0 border-right">
                            {item.diagnosesdataid}
                            </div>
                            <div className="col-9 p-0">
                            {item.diagnosesdataname}
                            </div>
                           
                          </div>                         
                          )
                      })}  
          </div>
          </div>
           <div className="col-4">
            처방검사
           <div className="overflow-auto  justify-content-center border" style={{height:"calc(35vh - 100px)"}} >
                {selectedTreatment&&testData&&testData.map((item,index)=>{
                    return(
                      <div className="row m-0 border-bottom text-center" key={index} style={{fontSize:"0.8em"}}>
                      <div className="col-3 p-0 border-right">
                      {item.testdataid}
                      </div>
                      <div className="col-9 p-0">
                      {item.testdataname}
                      </div>
                     
                    </div>                             
                      )
                })}  
          </div>
          </div>
           <div className="col-4">
             처방약
           <div className="overflow-auto  justify-content-center border" style={{height:"calc(35vh - 100px)"}} >
                
                {selectedTreatment&&drugsData&&drugsData.map((item,index)=>{
                      return(
                        <div className="row m-0 border-bottom text-center" key={index} style={{fontSize:"0.8em"}}>
                          <div className="col-3 p-0 border-right">
                          {item.drugid}
                          </div>
                          <div className="col-9 p-0">
                          {item.drugname}
                          </div>
                         
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