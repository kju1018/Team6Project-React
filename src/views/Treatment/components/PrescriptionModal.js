import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Item from "views/components/Item";

function PrescriptionModal(props) {

  const [searchName, setSearchName] = useState("");
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const search = () => {

  }

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
    const compare = prescriptionItems.findIndex((obj) => obj.drugid === item.drugid);
    if(compare >= 0){
      alert("이미 처방받았습니다.");
    } else {
      setPrescriptionItems((prevItems) => {
        const newItems = prevItems.concat(item);
        return newItems;
      });
    }
  }
  return (
    <Modal show={props.show} onHide={props.handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>타이틀</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className="d-flex mb-3">
          <div className="col-6 pl-0 pr-0 pt-2">처방내역</div>
          <div className="col-6 input-group pl-5 pt-2 d-flex justify-content-between">
            <div>
              목록
            </div>
            <div className="d-flex">
              <input type="text" onChange={handleSearchName}/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName)}>검색</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{height:"300px"}} className="row">
          
          <div className="col pl-0 pr-0 border ml-2">
            <div className="overflow-auto" style={{height:"260px"}}>
            {prescriptionItems != null &&
            prescriptionItems.map ((item, index) => {
              return (
                <div key={index} className="d-flex pt-2 pb-2">
                  <div className="col pl-0 pr-0 text-center">{item.drugid}</div>
                  <div className="col pl-0 pr-0 text-center">{item.drugname}</div>
                  <div className="col pl-0 pr-0 text-center">{item.drugtype}</div>
                  <div className="col pl-0 pr-0 text-center">코드</div>
                  <div className="col pl-0 pr-0 text-center"><button className="btn btn-success btn-sm">추가</button></div>
                </div>
              );
            })} 
            </div>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <i className="bi bi-arrow-left-square" style={{fontSize:"30px"}}></i>
          </div>
          <div className="col pl-0 pr-0 border mr-2">
            <div className="overflow-auto" style={{height:"260px"}}>
            {props.staticItemList != null &&
            props.staticItemList.map ((item, index) => {
              return (
                <div key={index} className="d-flex pt-2 pb-2 align-items-center">
                  <div className="col pl-0 pr-0 text-center">{item.drugid}</div>
                  <div className="col pl-0 pr-0 text-center">{item.drugname}</div>
                  <div className="col pl-0 pr-0 text-center">{item.drugtype}</div>
                  <div className="col pl-0 pr-0 text-center d-flex"><input type="number" style={{width:"40px"}}></input>{item.drugunit}</div>
                  <div className="col pl-0 pr-0 text-center"><button className="btn btn-success btn-sm" onClick={() => {addItme(item)}}>추가</button></div>
                </div>
              );
            })} 
            </div>
          </div> 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={props.handleClose}>
          닫기
        </Button>
        <Button variant="outline-success" size="sm" onClick={() => { prescribe(prescriptionItems) } }>
          선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PrescriptionModal;