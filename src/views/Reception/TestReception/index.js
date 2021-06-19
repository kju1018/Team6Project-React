import Item from "views/components/Item";

function TestReception(props){
   
    const property = ["id","name","room","state","registerday"]
    return(
        <div className="d-flex flex-column" style={{height:"520px"}}>
        <div className="row d-flex flex-row justify-content-between">
                <label style={{marginRight:"10px"}}>검사 접수 환자</label>
                <div>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">검사취소</button>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">수정</button>
                </div>
        </div>
        <div>
            <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">전체</button>
            <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">대기</button>
            <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">완료</button>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
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

export default TestReception;