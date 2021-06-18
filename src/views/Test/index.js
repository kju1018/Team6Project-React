import Chart from "./Chart";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestHeader from "./TestHeader";
import TestList from "./TestWaitingList";

function TestPage() { 
  return (
    <div className="100vh" style={{minWidth:"1000px"}}>
      <div className="row m-0">
        <div className="col-6 mt-5">
          <PeriodSearch/>
          <Chart/>
          <div className="text-right"><button className="btn btn-sm btn-dark mb-2 mt-3">검사 이력 조회 및 결과 입력</button></div>
          <TestHeader/>
          <TestList/>
        </div>
        <div className="col-6">
        <div className="mt-5 mb-1 text-right">
          <button type="button" className="btn btn-dark btn-sm mr-1">검사시작</button>
          <button type="button" className="btn btn-dark btn-sm mr-1">바코드출력</button>
          <button type="button" className="btn btn-dark btn-sm mr-1">접수취소</button>
          <button type="button" className="btn btn-dark btn-sm mr-1">엑셀저장</button>
          <button type="button" className="btn btn-dark btn-sm mr-1">검사완료</button>
        </div>
        <TestGroup/>
        </div>
      </div> 
    </div>
  );
}
export default TestPage;