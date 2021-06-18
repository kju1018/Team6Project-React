import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
function Reservation(props){
    const property = ["id","name","room","state","registerday"]
    return(
    <div className="d-flex flex-column " style={{height:"500px"}}>
        예약
        <Calendar/>

        <div className="d-flex justify-content-end mt-4">
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약수정</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">검사접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">진료접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약 및 취소접수</button>
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
            <div className="overflow-auto  justify-content-center" style={{height:"400px"}} >
               
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

export default Reservation;