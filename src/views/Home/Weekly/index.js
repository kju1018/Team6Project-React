import { forwardRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { deleteSchedule, getScheduleList } from "apis/Main";
import "./scrollbar.css";
import "./boxstyle.css";
import moment from "moment";
import WeeklyWrite from "./WeeklyWrite";
import WeeklyDetail from "./WeeklyDetail";

function Weekly(props) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));


  const [scheduleList, setScheduleList] = useState([]);
  const [board, setBoard] = useState({});

  const work = async() => {
    console.log(moment(startDate).format('YYYY-MM-DD'))
    const formatDate = moment(startDate).format('YYYY-MM-DD');
    const response = await getScheduleList(formatDate);

    console.log(response.data);
    setScheduleList(response.data);
  }

  const deleteScheduleState = (scheduleid, startDate) => {

    deleteSchedule(scheduleid, startDate).then((response) => {
      console.log(response.data);
      setScheduleList(response.data);
    });
  }

  useEffect(() => {
    work();
  }, [startDate])

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose = () => setShow(false);
  const handleShow = (board) => { 
    setShow(true); 
    setBoard(board); 
  }
  return(
    <>
    <h5>WEEKLY <img src="/appointment.png"width="30"height="30"/>
    <Button variant="outline-primary" style={{float: "right"}} onClick={handleShow1}>
      <img src="/pen.png"width="25"height="25"/></Button>
    <WeeklyWrite show={show1} handleClose1={handleClose1} work={work} startDate={startDate}></WeeklyWrite>
    <div className="text-center p-4">
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
    </div>
    </h5>
    <div className="scrollbar" id="style-7"  style={{height:"60vh"}}>
    <div className="force-overflow-auto">
   <table className="table table-hover">
     <thead className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
       <tr>
        <th scope="col">날짜</th>
        <th scope="col">일정</th>
         <th scope="col">작성자</th>
       </tr>
     </thead>
     <tbody>
       {console.log(scheduleList)}
       {scheduleList.length != 0 &&
       scheduleList.map((board,index) => {
         return(
           <tr onClick={() => {handleShow(board);}}>
            <th style={{width:"200px"}}>{board.date}</th>
            <th>{board.content}</th>
             <th style={{width:"200px"}}>{board.userid}</th>
           </tr>
          )
       })}
     </tbody>
    </table>
    </div>
    </div>
    
    {/* 함수명()  <- 함수를 실행하겠다는 뜻  */}

    <WeeklyDetail deleteScheduleState = {deleteScheduleState} board={board} show={show} handleClose1={handleClose}></WeeklyDetail>
    </>
  )
}

export default Weekly;