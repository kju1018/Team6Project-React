import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "views/style/datepicker.css";

function PeriodSearch() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </div>
  ));


  return (
    <div className="row">
            <div className="col-3" style={{backgroundColor: "rgb(197, 197, 197)"}}><div className="text-center mt-4 p-3" style={{color: ""}}>조회기간</div></div>
            <div className="col-9" style={{backgroundColor: "rgb(238, 238, 238)"}}>
              <div className="mt-3">
                <button type="button" className="btn btn-dark btn-sm mr-1" >당일</button>
                <button type="button" className="btn btn-dark btn-sm mr-1">7일</button>
                <button type="button" className="btn btn-dark btn-sm mr-1">15일</button>
                <button type="button" className="btn btn-dark btn-sm mr-1">1개월</button>
                <button type="button" className="btn btn-dark btn-sm mr-1">3개월</button>
              </div>
              <div className="row ml-1 mt-3 mb-3">
              <div className="row ml-0">
                <div className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                  <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                </div>
                <div className="mr-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<ExampleCustomInput />}
                />
                </div>
              </div>
              <div className="mr-4">-</div>
              <div className="row">
                <div className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                  <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                </div>
                <div className="mr-4">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={<ExampleCustomInput />}
                />
                </div>
              </div>
              <button className="btn btn-sm btn-dark">조회</button>
              </div>
            </div>
          </div>
  );
}
export default PeriodSearch;