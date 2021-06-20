import ButtonHeader from "views/Treatment/components/ButtonHeader";


function DiagnosisList(props) {
  return (
    <>
    <ButtonHeader headertitle="상병 목록" iclassName="bi bi-check2-square mr-1" buttonname="검색"/>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
        <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
          <div className="col-2 pr-2 pl-2 text-center">G55</div>
          <div className="col-5 pl-2 pr-2 text-center border-left">달리 분류된 질환에서의 신경근 및 신경총 압박</div>
          <div className="col-5 pl-2 pr-2 text-center border-left">Nerve root and plexus compressions in diseases classified elsewhere</div>
        </div>
      </div>
    </>
  );
}

export default DiagnosisList;