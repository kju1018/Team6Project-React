import { forwardRef, useState } from "react";
import { Table } from "react-bootstrap";
import WeeklyForm from "./WeeklyForm";
import DatePicker from "react-datepicker";
import "./scrollbar.css";
import "./boxstyle.css";

function Weekly(props) {
  // // test
  // const click = (item) =>{
  //   window.open("/home","test","width=500,height=600");
  // }
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return(
    <>
    <h5>WEEKLY <img src="/weekly.png"width="30"height="30"/>
    <div className="text-center">
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
    </div>
    </h5>
    <div className="scrollbar" id="style-7">
      <div className="force-overflow-auto">
      <Table bordered>
  <thead>
    <tr className="text-center" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
      <th><img src="/speed.png"width="20"height="20"/></th>
      <th>월요일</th>
      <th>화요일</th>
      <th>수요일</th>
      <th>목요일</th>
      <th>금요일</th>
      <th>토요일</th>
      <th>일요일</th>
    </tr>
  </thead>
  <tbody>
    <tr className="text-center">
      <td style={{height:"400px"}}><WeeklyForm/></td>
      <td style={{width:"150px"}}>
        <div className="banner1">신용권 원장님<div style={{float: "inline-end"}}><hr></hr>휴식 시간 오전 09:00 ~ 오전11:00</div></div>
      </td>
      <td style={{width:"150px"}}>
      <WeeklyForm/>
      </td>
      <td style={{width:"150px"}}>
      <div className="banner2">홍미경 원장님<div style={{float: "inline-end"}}><hr></hr>휴식 시간 오전 09:00 ~ 오전11:00</div></div>
      <div className="banner1">신용권 원장님<div style={{float: "inline-end"}}><hr></hr>외근 시간 오후 13:00 ~ 오후15:00</div></div>
      </td>
      <td style={{width:"150px"}}>
      <WeeklyForm/>
      </td>
      <td style={{width:"150px"}}>
      <div className="banner3">최은지 원장님<div style={{float: "inline-end"}}><hr></hr>휴식 시간 오전 09:00 ~ 오전11:00</div></div>
      </td>
      <td style={{width:"150px"}}>
      <WeeklyForm/>
      </td>
      <td style={{width:"150px"}}>
      <div className="banner2">홍미경 원장님<div style={{float: "inline-end"}}><hr></hr>근무시간 오후13:00 ~ 오후18:00</div></div>
      </td>
    </tr>
  </tbody>
</Table>
</div>
</div>
    </>
  )
}

export default Weekly;