import { useEffect } from "react";
import Item from "views/components/Item";


function TreatmentReception(props){
      
    useEffect(()=>{
        console.log(props.patientList)
        
    },[props.patientList])
    const property = ["id","name","room","state","registerday"]

    return(
        <div className="d-flex flex-column" style={{height:"450px"}}>
            <div className="d-flex justify-content-between">
                    <label style={{marginRight:"10px"}}>진료 접수 환자</label>
                    <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">접수취소</button>
            </div>
            <div>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">전체</button>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">대기</button>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">완료</button>
        
            </div>
            <div className="rounded-lg justify-content-center" style={{marginTop:"10px"}}>
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>진료실</div>
                <div style={{width:"20%"}}>진료상태</div>
                <div style={{width:"20%"}}>접수시간</div>
        
        
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"300px"}} >
               
                 {props.patientList&&props.patientList.map((item,index)=>{return(
                                    <div key={index}>
                                            <Item item ={item} property={property} order={index}/>
                                    </div>
                                    
                 )})} 
            </div>
            </div>
        </div>
    )
}

export default TreatmentReception;