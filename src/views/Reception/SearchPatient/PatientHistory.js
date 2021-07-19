import { GetTreatmentListBypatientid,GetTreatmentDetail } from "apis/Reception";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AutoSizer, List } from "react-virtualized";
import Item from "views/components/Item";
function PatientHistory(props) {
  const[selectedTreatment, setSelectedTreatment] = useState();
  const[treatmentData, setTreatmentData] = useState([])
  const[testData, setTestData] = useState([])
  const[drugsData, setDrugsData] = useState([])
  const[diagnosesData, setDiagnosesData] = useState([])
  const [loading,setLoading] = useState(false);
  
  const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
  useEffect(()=>{
    if(props.selectedPatient.patientid ){
        setLoading(true)
        //히스토리 상세기록 초기화해주기
        setSelectedTreatment(null)
        //해당 환자의 진료기록 불러오기
        GetTreatmentListBypatientid(props.selectedPatient.patientid).then((result)=>{
         //userlist도 불러와서 userid에 맞는 username 가져옴
          const userlist = result.data.userlist;
         const treatmentlist = result.data.treatmentlist
         const data = treatmentlist.map((item,index)=>
         {return {...item,patientname:props.selectedPatient.patientname,username:userlist[index].username}})
          setTreatmentData(data)
          setLoading(false)
        })
        
    }
  },[props.selectedPatient])
  useEffect(()=>{
    if(treatmentReception.patientid === props.selectedPatient.patientid ){
        setLoading(true)
        //히스토리 상세기록 초기화해주기
        setSelectedTreatment(null)
        //해당 환자의 진료기록 불러오기
        GetTreatmentListBypatientid(props.selectedPatient.patientid).then((result)=>{
         //userlist도 불러와서 userid에 맞는 username 가져옴
          const userlist = result.data.userlist;
         const treatmentlist = result.data.treatmentlist
         const data = treatmentlist.map((item,index)=>
         {return {...item,patientname:props.selectedPatient.patientname,username:userlist[index].username}})
          setTreatmentData(data)
          setLoading(false)
        })
        
    }
  },[treatmentReception])
  useEffect(()=>{
    if(selectedTreatment){
      setLoading(true)
      GetTreatmentDetail(selectedTreatment.treatmentid).then((result)=>{
        //데이터 배열의 첫번째가 진단, 두번째가 약, 세번째가 테스트 그룹임
        setDiagnosesData(result.data.treatmentdetail[0])
        setDrugsData(result.data.treatmentdetail[1]);
        setTestData(result.data.treatmentdetail[2]);
        setLoading(false)
      })
    }
    
  },[selectedTreatment])
  const click =useCallback( (focusItem) =>{
    setSelectedTreatment(focusItem);
  },[])

    const treatmentProperty = ["treatmentid","patientname","username","status","treatmentdate"]  
  return (
    <>
      <div className="p-2 pt-3" style={{height:"60vh"}}>
        <div style={{fontSize:"20px", fontWeight:"bold", borderBottom:"1px solid"}}><label style={{height:"100%"}}>환자 히스토리</label> {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}</div>
        <div className="mt-3 p-1">
          <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>진료ID</div>
                <div style={{width:"20%"}}>환자</div>
                <div style={{width:"20%"}}>진료자</div>
                <div style={{width:"20%"}}>접수상태</div>
                <div style={{width:"20%"}}>접수시간</div>
            </div>
            <div className="  justify-content-center" style={{height:"calc(25vh - 70px)"}} >
            {/* Autosize최적화 */}
            <AutoSizer disableHeight>
                        {({width, height}) => {
                            return(
                            
                            <List width={width} height={Math.round(window.innerHeight / (100 / 25))-70}
                                    list={treatmentData}
                                    rowCount={treatmentData.length}
                                    rowHeight={50}
                                    rowRenderer={({index, key, style}) => {
                                      return (
                                          <div key={key} style={style}>
                                          <Item onClick={click} item ={treatmentData[index]} property={treatmentProperty} order={index}/>
                                          </div>   
                                      );
                                      }}
                                    overscanRowCount={5}/>
                            )
                        }}
              </AutoSizer>



                  {/* {treatmentData.map((item,index)=>{
                    if(item.patientid===props.selectedPatient.patientid){
                      return(
                        <div key={index}>
                                <Item onClick={click} item ={item} property={treatmentProperty} order={index}/>
                        </div>                         
                        )
                    }
                        
                  })}   */}
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