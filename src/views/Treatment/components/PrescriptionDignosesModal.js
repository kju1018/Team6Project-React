import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import PrescriptionDignosesItem from "./PrescriptionDignosesItem";

function PrescriptionDignosesModal(props) {

  const [searchName, setSearchName] = useState("");
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };
  console.log("상병목록 리렌더링");
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

  const addItem = (item) => {
    const compare = prescriptionItems.findIndex((obj) => obj.diagnosesdataid === item.diagnosesdataid);
    if(compare >= 0){
      alert("이미 처방받았습니다.");
    } else {
      setPrescriptionItems((prevItems) => {
        item.treatmentid=props.treatment.treatmentid;
        const newItems = prevItems.concat(item);
        return newItems;
      });
    }
  }

  const removeItem = (item) => {
    setPrescriptionItems((prevItems) => {
      const newItems = prevItems.filter(prevItem => prevItem.diagnosesdataid != item.diagnosesdataid);
      return newItems;
    })
  }

  const rowRenderer = ({index, key, style}) => {
    
  }

  return (
    <Modal animation={false} show={props.show} onHide={props.handleClose} size="xl" centered>
      <Modal.Header closeButton style={{backgroundColor:"#1B296D"} }>
        <Modal.Title style={{color:"#FFFFFF"}}>병명 입력</Modal.Title>
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
        <div style={{height:"500px"}} className="d-flex">
          <div className="pl-0 pr-0" style={{width:"506px"}}>
            <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
              <div style={{width:"25%"}}>질병코드</div>
              <div style={{width:"25%"}}>질병명(한글)</div>
              <div style={{width:"25%"}}>질병명(영어)</div>
              <div style={{width:"25%"}}></div>
            </div>
            <div className="overflow-auto border" style={{height:"450px"}}>
            {prescriptionItems != null &&
            prescriptionItems.map ((item, index) => {
              return (
                <div key={item.diagnosesdataid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
                  <div style={{width:"25%"}}>{item.diagnosesdataid}</div>
                  <OverlayTrigger placement="right"
                      overlay={<Tooltip>{item.diagnosesdataname}</Tooltip>}>
                    <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.diagnosesdataname}</div>
                  </OverlayTrigger>
                  <OverlayTrigger placement="right"
                      overlay={<Tooltip>{item.diagnosesdataename}</Tooltip>}>
                    <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.diagnosesdataename}</div>
                  </OverlayTrigger>
                  <div style={{width:"25%"}}><button className="btn btn-danger btn-sm" onClick={() => {removeItem(item)}}>제거</button></div>
                </div>
              );
            })} 
            </div>
          </div> 

          <div className="col-1 d-flex align-items-center justify-content-center">
            <i className="bi bi-arrow-left-square" style={{fontSize:"30px"}}></i>
          </div>

          <div className="pl-0 pr-0" style={{width:"506px"}}>
            <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
              <div style={{width:"25%"}}>질병코드</div>
              <div style={{width:"25%"}}>질병명(한글)</div>
              <div style={{width:"25%"}}>질병명(영어)</div>
              <div style={{width:"25%"}}></div>
            </div>
            <div className="overflow-auto border" style={{height:"450px"}}>

            {props.staticItemList != null &&
            props.staticItemList.map ((item, index) => {
              if((item.diagnosesdataname.indexOf(searchName) != -1) 
                  || (item.diagnosesdataename.indexOf(searchName) != -1)
                  || (item.diagnosesdataid.indexOf(searchName) != -1)){
                return (
                  <PrescriptionDignosesItem key={item.diagnosesdataid} item={item} addItem={addItem}></PrescriptionDignosesItem>
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

export default PrescriptionDignosesModal;