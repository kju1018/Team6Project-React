function PatientProfile(props) {
  return (
    <>
      <div className="d-flex align-items-center" style={{height:"50px"}}>환자 프로필</div>
      <div className="overflow-auto" style={{height:"calc(100% - 50px)", overflowX:"auto"}}>
        <div className="d-flex ml-0 mr-0" style={{height:"33.3%", minWidth:"200px"}}>
          <div class="col d-flex flex-column justify-content-center">
            <div className="mb-1" style={{fontSize:"4px"}}><span>이름</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>김민석</div>
          </div>
          <div class="col d-flex flex-column justify-content-center">
            <div className="mb-1" style={{fontSize:"4px"}}><span>나이</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>27세</div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center" style={{height:"33.3%"}}>
          <div className="mt-2 mb-1" style={{fontSize:"4px", paddingLeft:"15px"}}><span>주민등록 번호</span></div>
          <div className="ml-0 mr-0 row">
            <div class="col ">
              <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>951018</div>
            </div>
            <div className="d-flex align-items-center">-</div>
            <div class="col">
              <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>1234567</div>
            </div>
          </div>
        </div>
        <div className="row ml-0 mr-0" style={{height:"33.3%"}}>
          <div class="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"4px"}}><span>성별</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>남</div>
          </div>
          <div class="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"4px"}}><span>전화번호</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>010-1234-4444</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile;