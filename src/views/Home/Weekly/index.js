import { forwardRef, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import WeeklyForm from "./WeeklyWrite";
import DatePicker from "react-datepicker";
import { getScheduleList } from "apis/Main";
import "./scrollbar.css";
import "./boxstyle.css";
import moment from "moment";
import WeeklyWrite from "./WeeklyWrite";

function Weekly(props) {
  const [show1, setShow1] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const [scheduleList, setScheduleList] = useState([]);

  const work = async() => {
    console.log(moment(startDate).format('YYYY-MM-DD'))
    const formatDate = moment(startDate).format('YYYY-MM-DD');
    const response = await getScheduleList(formatDate);

    console.log(response.data);
    setScheduleList(response.data);
  }
  console.log(startDate);
  console.log(startDate.getTime());

  console.log(213);

  useEffect(() => {
    work();
  }, [startDate])

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return(
    <>
    <h5>WEEKLY <img src="/weekly.png"width="30"height="30"/>
    <Button variant="outline-primary" style={{float: "right"}} onClick={handleShow1}>
      <img src="/pen.png"width="25"height="25"/></Button>
    <WeeklyWrite show={show1} handleClose1={handleClose1} work={work}></WeeklyWrite>
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
   <table className="table table-hover">
     <thead className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
       <tr>
         <th scope="col">#</th>
         <th scope="col">작성자</th>
         <th scope="col">내용</th>
         <th scope="col">날짜</th>
       </tr>
     </thead>
     <tbody>
       {console.log(scheduleList)}
       {scheduleList.length != 0 &&
       scheduleList.map((board,index) => {
         return(
           <tr>
             <th style={{width:"100px"}}>{index}</th>
             <th style={{width:"200px"}}>{board.userid}</th>
             <th>{board.content}</th>
             <th style={{width:"200px"}}>{board.date}</th>
           </tr>
          )
       })}
     </tbody>
    </table>
    </div>
    </div>
    </>
  )
}

export default Weekly;