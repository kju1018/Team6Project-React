function PatientTreatment(props) {
  return (
    <>
      <div className="d-flex align-items-center" style={{height:"50px"}}>과거 진료 내역</div>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">2021-06-08 진료</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">14:20</div>
        </div>
        
        <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">2021-06-08 진료</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">14:20</div>
        </div>

        <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">2021-06-08 진료</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">14:20</div>
        </div>

        <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">2021-06-08 진료</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">14:20</div>
        </div>

      </div>
          
    </>
  );
}

export default PatientTreatment;