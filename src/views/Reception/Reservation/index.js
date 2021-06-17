import Calendar from "../SearchPatient/Calendar"

function Reservation(props){
    return(
    <div className="d-flex flex-column " style={{height:"450px"}}>
        <div className="row" style={{marginBottom:"5px", width:"100%",height:"10%", padding:"5px 10px"}}>
                <label style={{margin:"0px 10px"}}>예약</label>
        </div>
        <Calendar month={2}/>

        <div className="row justify-content-end mt-4">
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약수정</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">검사접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">진료접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약 및 취소접수</button>
        </div>
        <div className=" row rounded-lg justify-content-center " style={{margin:"10px 5px",width:"100%",height:"200px", padding:"5px 0px"}}>

            <div className="row d-flex justify-content-between text-center border " style={{borderRadius:"15px",width:"91%",marginLeft:"5px", padding:"5px 15px"}}>
                <div style={{width:"10%"}}>순번</div>
                <div style={{width:"10%"}}>ID</div>
                <div style={{width:"15%"}}>이름</div>
                <div style={{width:"15%"}}>종류</div>
                <div style={{width:"25%"}}>예약일</div>
                <div style={{width:"25%"}}>예약시간</div>
                
                
            </div>
            <div className="row overflow-auto  justify-content-center " style={{height:"200px", width:"100%",marginLeft:"15px",  padding:"5px 20px"}}>
            {props.patientList&&props.patientList.map((item,index)=>{return(
                                <div key={index} className="row d-flex justify-content-between text-center border" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px",borderRadius:"15px",marginBottom:"1px" ,padding:"0px 10px",width:"100%"}}>
                                        <div style={{width:"10%"}}>{index}</div>
                                        <div style={{width:"10%"}}>{item.id}</div>
                                        <div style={{width:"15%"}}>{item.name}</div>
                                        <div style={{width:"15%"}}>{item.sex===0?"검사":"진료"}</div>
                                        <div style={{width:"25%"}}>{item.lasttreatment}</div>
                                        <div style={{width:"25%"}}>{item.registerday}</div>
                                </div>
                                
                            )})}
            </div>
</div>
                    
    </div>
    )
}

export default Reservation;