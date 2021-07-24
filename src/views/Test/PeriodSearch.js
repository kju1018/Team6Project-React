import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "views/style/datepicker.css";
import { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용

registerLocale("ko", ko) // 한국어적용

function PeriodSearch(props) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [btnClicked, setBtnClicked] = useState("당일");
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" onClick={onClick} ref={ref}>
      <div className="mr-1">
      <i className="bi bi-calendar-day mr-3"></i>              
      {value}
      </div>
    </div>
  ));

  const dateSubmit = () => {
    props.getpatient(start, end) //mysql between 이상~초과 여서 인식불가. 1일 추가해줘야함
    props.setStartdate(start)
    props.setEnddate(end)
  }

  const handleBtnClicked = (e) => {
    const { value } = e.target;
    setBtnClicked(value);
    const currentDate = new Date(); 
    // 오늘 날짜
    if (value === "당일") {
      setStart(new Date());
      setEnd(new Date());
    }
    // 3일 전부터 오늘까지의 기간
    if (value === "3일") {
      let threeDaysAgo = new Date(
        currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
      );
      setStart(threeDaysAgo);
      setEnd(new Date());
    }
    // 1주일 전부터 오늘까지의 기간
    if (value === "1주일") {
      let weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      setStart(weekAgo);
      setEnd(new Date());
    }
    // 1개월 전부터 오늘까지의 기간
    if (value === "1개월") {
      let oneMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      );
      setStart(oneMonthAgo);
      setEnd(new Date());
    }
    // 3개월 전부터 오늘까지의 기간
    if (value === "3개월") {
      let threeMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 3,
        new Date().getDate()
      );
      setStart(threeMonthAgo);
      setEnd(new Date());
    }
  };

  return (
    <div>
            <div className="mt-3 mb-3" style={{backgroundColor: "#EDECEA"}}>
              <div className="ml-3 pt-2">
                <button type="button" className="btn btn-dark btn-sm mr-1" value="당일" onClick={ handleBtnClicked }>당일</button>
                <button type="button" className="btn btn-dark btn-sm mr-1" value="3일" onClick={ handleBtnClicked }>3일</button>
                <button type="button" className="btn btn-dark btn-sm mr-1" value="1주일" onClick={ handleBtnClicked }>1주일</button>
                <button type="button" className="btn btn-dark btn-sm mr-1" value="1개월" onClick={ handleBtnClicked }>1개월</button>
                <button type="button" className="btn btn-dark btn-sm mr-1" value="1개월" onClick={ handleBtnClicked }>3개월</button>
              </div>
              <div className="row ml-3 mt-3 mb-2 pb-2">
              <div className="row ml-1">
                <div className="mr-4">
                  <div>From: </div>
                <DatePicker
                  selected={start}
                  onChange={(date) => setStart(date)}
                  customInput={<ExampleCustomInput />}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                />
                </div>
              </div>
              <div className="row ml-3">
                <div className="mr-4">
                <div>To: </div>
                <div className="row ml-0">
                <DatePicker
                  selected={end}
                  onChange={(date) => setEnd(date)}
                  customInput={<ExampleCustomInput />}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                />
                </div>
                </div>
              </div>
              </div>
              <button className="btn btn-dark btn-block" onClick={ dateSubmit }>Submit</button>
            </div>
          </div>
  );
}
export default PeriodSearch;