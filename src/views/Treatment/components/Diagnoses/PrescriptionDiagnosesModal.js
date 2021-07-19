import { useCallback, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AutoSizer, List } from "react-virtualized";
import PrescriptionDiagnosesItem from "./PrescriptionDiagnosesItem";

function PrescriptionDiagnosesModal(props) {

  const [searchName, setSearchName] = useState("");
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchType, setSearchType] = useState("dataid");

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  useEffect(() => {
    if(props.show === true){
      setPrescriptionItems(props.itemList);
      setSearchList(props.staticItemList);
      setSearchName("");
    }
  },[props]);

  const prescribe = useCallback((items) => {
    props.prescribe(items);
    props.handleClose();
  }, [props]);

  const addItem = useCallback((item) => {
      setPrescriptionItems((prevItems) => {
        const compare = prevItems.findIndex((obj) => obj.diagnosesdataid === item.diagnosesdataid);
        if(compare >= 0){
          alert("이미 처방받았습니다.");
          return prevItems;
        } else {
          const newItem = {
            ...item,
            treatmentid:props.treatment.treatmentid
          }
          const newItems = prevItems.concat(newItem);
          return newItems;
        }
      });
  },[props.treatment]);

  const removeItem = useCallback((item) => {
    setPrescriptionItems((prevItems) => {
      const newItems = prevItems.filter(prevItem => prevItem.diagnosesdataid !== item.diagnosesdataid);
      return newItems;
    })
  }, [])

  const selectType = useCallback((event) => {
    setSearchType(event.target.value);
  }, []);

  const search = useCallback((search, searchType) => {
    let newItems = [];
    search = search.toUpperCase();
    setSearchList(() => {
      if(searchType === "dataid") {
        newItems = props.staticItemList.filter(diagnosis => (diagnosis.diagnosesdataid.toUpperCase()).indexOf(search) !== -1)
      } else if(searchType === "kname") {
        newItems = props.staticItemList.filter(diagnosis => diagnosis.diagnosesdataname.indexOf(search) !== -1)
      } else if(searchType === "ename") {
        newItems = props.staticItemList.filter(diagnosis => (diagnosis.diagnosesdataename.toUpperCase()).indexOf(search) !== -1)
      }
      return newItems;
    })

  },[props.staticItemList]);

  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PrescriptionDiagnosesItem item={searchList[index]} addItem={addItem}></PrescriptionDiagnosesItem>
      </div>
    )
  }
  return (
    <Modal animation={false} show={props.show} onHide={props.handleClose} size="xl" centered>
      <Modal.Header closeButton style={{backgroundColor:"#1B296D"}}>
        <Modal.Title style={{color:"#FFFFFF"}}>상병 목록</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="input-group d-flex pb-2 justify-content-end border-bottom">
          <div className="d-flex">
          <select className="custom-select" style={{width:"110px"}} onChange={selectType}>
            <option value="dataid" selected={searchType ==="dataid"}>질병코드</option>
            <option value="kname" selected={searchType ==="kname"}>질병명(한글)</option>
            <option value="ename" selected={searchType ==="ename"}>질병명(영어)</option>
          </select>
            <input type="text" onChange={handleSearchName}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName ,searchType)}>검색</button>
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
            <div className="border" style={{height:"450px"}}>
              {searchList.length === 0 ? 
              <div className="h-100 d-flex align-items-center justify-content-center">
                <i className="bi bi-x-octagon mr-2"></i>  검색 결과가 없습니다.
              </div>
              :
              <AutoSizer>
                {
                  ({width, height}) => {
                    return(
                      <List width={width} height={height}
                        rowCount={searchList.length}
                        rowHeight={50}
                        rowRenderer={rowRenderer}
                        overscanRowCount={5}
                      />
                    )
                  }
                }
              </AutoSizer>
              }
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

export default PrescriptionDiagnosesModal;