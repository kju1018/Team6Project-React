import Item from "views/components/Item";
import {getPatientData} from "../BackEnd/index"
function PatientHistory(props) {

    const click =() =>{

    }
  return (
    <>
      <div className="p-2 pt-3" style={{height:"calc(70%)"}}>
        <div style={{fontSize:"20px", fontWeight:"bold", borderBottom:"1px solid"}}>환자 히스토리</div>
        <div className="mt-3 p-1">
          <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>상태</div>
                <div style={{width:"20%"}}>예약타입</div>
                <div style={{width:"20%"}}>예약시간</div>
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"250px"}} >
                
                 {/* {getPatientData().map((item,index)=>{
                        return(
                            <div key={index}>
                                    <Item onClick={click} item ={item} property={props.property} order={index}/>
                            </div>                         
                            )
                        })}  */}
            </div>
        </div>

        <div className="border" style={{borderRadius:"15px",height:"322px"}}>
            dsaf

        </div>

        </div>
      </div>
    </>
  );

  } 
  
  export default PatientHistory;