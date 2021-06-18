

import PrescriptionHeader from "views/Treatment/components/PrescriptionHeader";


function DrugList(props) {
  return (
    <>
    <PrescriptionHeader headertitle="처방약 목록" buttonname="검색"/>
    <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      <div className="pt-2 pb-2 mb-2 d-flex" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
        <div className="col-3 pr-0 pl-0 text-center border-left">NIZA15</div>
        <div className="col-5 pr-0 pl-0 text-center border-left">AXID Cap 150mg</div>
        <div className="col-3 pr-0 pl-0 text-center border-left">내복약</div>
        <div className="col-1 pr-0 pl-0 text-center border-left">C</div>
      </div>
        
      </div>
    </>
  );
}

export default DrugList;