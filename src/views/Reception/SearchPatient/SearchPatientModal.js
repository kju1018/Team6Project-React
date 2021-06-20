import Item from "views/components/Item";
function SearchPatientModal(props){
    const property = ["id","name","room","state","registerday"]
    return(
    <div className="conatainer" style={{height:"400px"}}>
        <div className="d-flex justify-content-between">
            <div >
                <label style={{marginRight:"10px"}}>검색</label>
                <select style={{marginRight:"10px"}}>dd</select>
                <input style={{marginRight:"10px"}}></input>
                <button className="btn btn-outline-dark btn-sm">조회</button>
            </div>

            <div >
                  <button className="btn btn-outline-dark btn-sm">선택</button>
            </div>
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

export default SearchPatientModal;