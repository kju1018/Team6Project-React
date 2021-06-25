import { forwardRef, useState } from "react";
import { Table } from "react-bootstrap";

function Weekly(props) {
  // test
  const click = (item) =>{
    window.open("/home","test","width=500,height=600");
  }
  return(
    <>
    <h5>WEEKLY <img src="/weekly.png"width="30"height="30"/></h5>
      <Table striped bordered hover variant="dark">
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
      <td>09:00</td>
      <td onClick={click}></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>10:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>11:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>12:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>13:00</td>
      <td colSpan="7">LUNCH TIME</td>
    </tr>
    <tr className="text-center">
    <td>14:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>15:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>16:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>17:00</td>
      <td colSpan="7">DINNER TIME</td>
    </tr>
    <tr className="text-center">
    <td>18:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr className="text-center">
    <td>19:00</td>
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