import { useEffect, useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import Item from "views/components/Item";


function TreatmentReception(props){
    const [listtype, setListtype] = useState("all");
    useEffect(()=>{
        console.log(props.patientList)
        
    },[props.patientList])
    const property = ["id","name","room","state","registerday"]
    const handleChange = (event) => {
        setListtype(event.target.value);
      }
    return(
        <div className="d-flex flex-column" style={{height:"520px"}}>
            <div className="d-flex justify-content-between">
                    <label style={{marginRight:"10px"}}>진료 접수 환자</label>
                    <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">접수취소</button>
            </div>
            <div>
            <ButtonGroup toggle>
                <ToggleButton type="radio" variant={`${listtype === "all" ? "secondary" : "light" }`} name="type"  checked={listtype==="all"} value="all" onChange={handleChange}><div className="ml-5 mr-5">전체</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "wait" ? "secondary" : "light" }`} name="type"  checked={listtype==="wait"} value="wait" onChange={handleChange}><div className="ml-5 mr-5">대기</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "complete" ? "secondary" : "light" }`} name="type"  checked={listtype==="complete"} value="complete" onChange={handleChange}><div className="ml-5 mr-5">완료</div></ToggleButton>
            </ButtonGroup>
                
        
            </div>
            <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px", marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>   
                <div style={{width:"20%"}}>진료실</div>
                <div style={{width:"20%"}}>진료상태</div>
                <div style={{width:"20%"}}>접수시간</div>
        
        
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"394px"}} >
               
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