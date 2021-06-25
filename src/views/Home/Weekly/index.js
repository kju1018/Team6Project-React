import { forwardRef, useState } from "react";
import { Table } from "react-bootstrap";
import WeeklyForm from "./WeeklyForm";

function Weekly(props) {
  // // test
  // const click = (item) =>{
  //   window.open("/home","test","width=500,height=600");
  // }
  return(
    <>
    <h5>WEEKLY <img src="/weekly.png"width="30"height="30"/></h5>
      <Table striped bordered hover>
  <thead>
    <tr className="text-center">
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
      <td><strong>09:00</strong></td>
      <td><WeeklyForm/></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>10:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>11:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>12:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>13:00</strong></td>
      <td colSpan="7"><strong>LUNCH TIME</strong></td>
    </tr>
    <tr className="text-center">
    <td><strong>14:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>15:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>16:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>17:00</strong></td>
      <td colSpan="7"><strong>DINNER TIME</strong></td>
    </tr>
    <tr className="text-center">
    <td><strong>18:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td><strong>19:00</strong></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</Table>
    </>
  )
}

export default Weekly;