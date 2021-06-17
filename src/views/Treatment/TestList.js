function TestList(props) {
  return (
    <>
      <div className="row align-items-center" style={{height:"50px"}}>
        {/* 집에서는 align-items-center 없이 잘 나옴 */}
        <div className="col">검사 목록</div>
        <div className="col text-center"><button className="btn btn-info btn-sm">검색</button></div>
      </div>
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