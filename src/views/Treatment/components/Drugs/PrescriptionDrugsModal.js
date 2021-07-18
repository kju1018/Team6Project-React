import { useCallback, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AutoSizer, List } from "react-virtualized";
import PrescriptionDrugsItem from "./PrescriptionDrugItem"

function PrescriptionDrugsModal(props) {

  const [searchName, setSearchName] = useState("");
  const [quantityArr, setQuantityArr] = useState({});
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };
  
  const onChangeQuantity = useCallback((e, quantityArr) => {
    setQuantityArr({
      ...quantityArr,
      [e.target.name]:e.target.value
    })
  }, []);
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  useEffect(() => {
    if(props.show === true){
      setPrescriptionItems(props.itemList);
      setQuantityArr({});
      setSearchName("");
    }
  },[props]);

  const prescribe = useCallback((items) => {
    props.prescribe(items);
    props.handleClose();
  }, [props]);


  const addItem = useCallback((item, quantity=1, quantityArr) => {
    if(quantity <=0){
      quantity = 1;
    }
    setPrescriptionItems((prevItems) => {
      const compare = prevItems.findIndex((obj) => obj.drugid === item.drugid);
      if(compare >= 0){
        alert("이미 처방받았습니다.");
        return prevItems;
      } else {
        const newItem = {
          ...item,
          quantity:quantity,
          treatmentid:props.treatment.treatmentid
        }
        const newItems = prevItems.concat(newItem);
        setQuantityArr({
          ...quantityArr,
          [item.drugid] : 0
        })
        return newItems;
      }
    });

  }, [props.treatment]);

  const removeItem = useCallback((item) => {
    setPrescriptionItems(prevItems => {
      const newItems = prevItems.filter(prevItem => prevItem.drugid != item.drugid);
      return newItems;
    })
  }, []);

  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PrescriptionDrugsItem item={props.staticItemList[index]} addItem={addItem} quantityArr={quantityArr} onChangeQuantity={onChangeQuantity}></PrescriptionDrugsItem>
      </div>
    )
  }


  return (
    <Modal animation={false} show={props.show} onHide={props.handleClose} size="xl" centered>
      <Modal.Header closeButton style={{backgroundColor:"#1B296D"} }>
        <Modal.Title style={{color:"#FFFFFF"}}>약 처방</Modal.Title>
      </Modal.Header>
      <Modal.Body>

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
              <div style={{width:"25%"}}>약품코드</div>
              <div style={{width:"25%"}}>약품명</div>
              <div style={{width:"25%"}}>수량</div>
              <div style={{width:"25%"}}></div>
            </div>
            <div className="overflow-auto border" style={{height:"450px"}}>
            {prescriptionItems != null &&
            prescriptionItems.map ((item, index) => {
              return (
                <div key={item.drugid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
                  <div style={{width:"25%"}}>{item.drugid}</div>
                  <OverlayTrigger placement="right"
                      overlay={<Tooltip>{item.drugname}</Tooltip>}>
                    <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.drugname}</div>
                  </OverlayTrigger>
                  <div style={{width:"25%"}}>{item.quantity} {item.drugunit}</div>
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
              <div style={{width:"25%"}}>약품명</div>
              <div style={{width:"25%"}}>수량</div>
              <div style={{width:"25%"}}></div>
            </div>
            <div className="border" style={{height:"450px"}}>
              <AutoSizer>
                {
                  ({width, height}) => {
                    return (
                      <List width={width} height={height}
                        rowCount={props.staticItemList.length}
                        rowHeight={50}
                        rowRenderer={rowRenderer}
                        overscanRowCount={5}
                      />
                    )
                  }
                }
              </AutoSizer>
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

export default PrescriptionDrugsModal;