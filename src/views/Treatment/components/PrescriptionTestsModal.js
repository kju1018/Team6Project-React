import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

function PrescriptionTestsModal(props) {

  const [searchName, setSearchName] = useState("");
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const [prescriptionItems, setPrescriptionItems] = useState([]);
  useEffect(() => {
    if(props.show === true){
      setPrescriptionItems(props.itemList);
    }
  },[props]);

  const prescribe = (items) => {
    props.prescribe(items);
    props.handleClose();
  }

  const addItme = (item) => {
    const compare = prescriptionItems.findIndex((obj) => obj.testdataid === item.testdataid);
    if(compare >= 0){
      alert("이미 처방받았습니다.");
    } else {
      setPrescriptionItems((prevItems) => {
        const tempItems = {...prevItems};
        const newItems = prevItems.concat(item);
        console.log(tempItems);
        return newItems;
      });
    }
  }

  const removeItem = (item) => {
    setPrescriptionItems((prevItems) => {
      const newItems = prevItems.filter(prevItem => prevItem.testdataid !== item.testdataid);
      return newItems;
    })
  }
  return (
    <Modal animation={false} show={props.show} onHide={props.handleClose} size="xl" centered>
      <Modal.Header closeButton style={{backgroundColor:"#1B296D"} }>
        <Modal.Title style={{color:"#FFFFFF"}}>검사 처방</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="input-group d-flex pb-2 justify-content-end border-bottom">
          <div className="d-flex">
            <input type="text" onChange={handleSearchName}/>
            <div className="input-group-append">
              {/* <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName)}>검색</button> */}
            </div>
          </div>
        </div>
        <div style={{height:"550px"}} className="d-flex">
          <div className="pl-0 pr-0" style={{width:"506px", marginTop:"50px"}}>
            <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
              <div style={{width:"20%"}}>그룹코드</div>
              <div style={{width:"20%"}}>그룹명</div>
              <div style={{width:"20%"}}>처방코드</div>
              <div style={{width:"20%"}}>처방명</div>
              <div style={{width:"20%"}}></div>
            </div>
            <div className="overflow-auto border" style={{height:"450px"}}>
            {prescriptionItems != null &&
            prescriptionItems.map ((item, index) => {
              return (
                <div key={item.testdataid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
                  <div style={{width:"20%"}}>{item.groupcode}</div>
                  <OverlayTrigger placement="right"
                      overlay={<Tooltip>{item.groupname}</Tooltip>}>
                    <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.groupname}</div>
                  </OverlayTrigger>
                  <div style={{width:"20%"}}>{item.testdataid}</div>
                  <OverlayTrigger placement="right"
                      overlay={<Tooltip>{item.testname}</Tooltip>}>
                    <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.testname}</div>
                  </OverlayTrigger>
                  <div style={{width:"20%"}}><button className="btn btn-danger btn-sm" onClick={() => {removeItem(item)}}>제거</button></div>
                </div>
              );
            })} 
            </div>
          </div> 

          <div className="col-1 d-flex align-items-center justify-content-center">
            <i className="bi bi-arrow-left-square" style={{fontSize:"30px"}}></i>
          </div>

          <div className="pl-0 pr-0" style={{width:"506px"}}>
            <div style={{height:"50px"}}>ss</div>
            <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
              <div style={{width:"20%"}}>그룹코드</div>
              <div style={{width:"20%"}}>그룹명</div>
              <div style={{width:"20%"}}>처방코드</div>
              <div style={{width:"20%"}}>처방명</div>
              <div style={{width:"20%"}}></div>
            </div>
            <div className="overflow-auto border" style={{height:"450px"}}>

            {props.staticItemList != null &&
            props.staticItemList.map ((item, index) => {
              if((item.testdataid.indexOf(searchName) != -1) 
                  || (item.testname.indexOf(searchName) != -1)
                  || (item.groupcode.indexOf(searchName) != -1)){
                return (
                  <div key={item.testdataid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
                    <div style={{width:"20%"}}>{item.groupcode}</div>
                    <OverlayTrigger placement="right"
                        overlay={<Tooltip>{item.groupname}</Tooltip>}>
                      <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.groupname}</div>
                    </OverlayTrigger>
                    <div style={{width:"20%"}}>{item.testdataid}</div>
                    <OverlayTrigger placement="right"
                        overlay={<Tooltip>{item.testname}</Tooltip>}>
                      <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.testname}</div>
                    </OverlayTrigger>
                    <div style={{width:"20%"}}><button className="btn btn-success btn-sm" onClick={() => {addItme(item)}}>추가</button></div>
                  </div>
                );
              }
            })} 
            </div>
          </div> 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={props.handleClose}>
          닫기
        </Button>
        <Button variant="outline-primary" size="sm" onClick={() => { prescribe(prescriptionItems) } }>
          선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PrescriptionTestsModal;