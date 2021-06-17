import PrescriptionHeader from "./components/PrescriptionHeader";

function TestList(props) {

  return (
    <>
      <PrescriptionHeader headertitle="검사 목록" buttonname="저장"/>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">L2001</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">CBC (CBC,PLT,DIFF)</div>
        </div>
        <div className="pt-2 pb-2 mb-2 d-flex" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">L2001</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">CBC (CBC,PLT,DIFF)</div>
        </div>

        <div className="pt-2 pb-2 mb-2 d-flex" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">L2001</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">CBC (CBC,PLT,DIFF)</div>
        </div>

        <div className="pt-2 pb-2 mb-2 d-flex" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">L2001</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">CBC (CBC,PLT,DIFF)</div>
        </div>

        <div className="pt-2 pb-2 mb-2 d-flex" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-5 pr-0 pl-0 text-center">L2001</div>
          <div className="col-7 pl-0 pr-0 text-center border-left">CBC (CBC,PLT,DIFF)</div>
        </div>
      </div>
    </>
  );
}

export default TestList;