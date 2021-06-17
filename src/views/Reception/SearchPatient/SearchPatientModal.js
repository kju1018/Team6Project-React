function SearchPatientModal(props){

    return(
    <div className="conatainer" style={{padding:"1px 40px", height:"300px"}}>
        <div className="row d-flex justify-content-between">
            <div >
                <label style={{marginRight:"10px"}}>검색</label>
                <select style={{marginRight:"10px"}}>dd</select>
                <input style={{marginRight:"10px"}}></input>
                <button className="btn btn-outline-dark btn-sm">조회</button>
            </div>

            <div >
                  <button className="btn btn-outline-dark btn-sm">등록</button>
            </div>
        </div>
        <div className=" row rounded-lg justify-content-center " style={{width:"100%",height:"200px", marginTop:"10px"}}>

    
        <div className="row d-flex justify-content-between text-center border " style={{borderRadius:"15px",width:"100%",marginLeft:"5px"}}>
        <div style={{width:"10%"}}>ID</div>
        <div style={{width:"10%"}}>이름</div>
        <div style={{width:"10%"}}>나이</div>
        <div style={{width:"20%"}}>등록일</div>
        <div style={{width:"25%"}}>등록시간</div>
        <div style={{width:"25%"}}>Phone</div>
        </div>
        <div className="row overflow-auto  justify-content-center " style={{height:"200px", width:"100%",marginLeft:"15px", marginTop:"10px"}}>
        {props.patientList&&props.patientList.map((item,index)=>{return(
                            <div key={index} className="row d-flex justify-content-between text-center border" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px",borderRadius:"15px",marginBottom:"1px" ,width:"100%"}}>
                                    <div style={{width:"10%"}}>{item.id}</div>
                                    <div style={{width:"10%"}}>{item.name}</div>
                                    <div style={{width:"10%"}}>{item.age}</div>
                                    <div style={{width:"20%"}}>{item.registerday}</div>
                                    <div style={{width:"25%"}}>{item.lasttreatment}</div>
                                    <div style={{width:"25%"}}>{item.phone}</div>
                            </div>
                            
                        )})}
        </div>
</div>
    </div>
    )
}

export default SearchPatientModal;