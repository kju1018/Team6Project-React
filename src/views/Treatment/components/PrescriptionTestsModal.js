import { useEffect, useState } from "react";
import { Accordion, Button, Card, Modal, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";

function PrescriptionTestsModal(props) {

  const [searchName, setSearchName] = useState("");
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [groupTests, setGroupTests] = useState([]);
  useEffect(() => {
    if(props.show === true){
      setPrescriptionItems(props.itemList);
    }
  },[props]);

  useEffect(() => {
    const group = props.staticItemList.reduce((gt, t) => {
      if(!gt[t.groupcode]){
        gt[t.groupcode] = {};
        gt[t.groupcode].groupcode = t.groupcode;
        gt[t.groupcode].groupname = t.groupname;
        gt[t.groupcode].tests = [];
        gt[t.groupcode].tests.push(t);
      } else {
        gt[t.groupcode].tests.push(t);
      }
      return gt;
    }, {});
    console.log(group);
    setGroupTests(group);
  }, [props.staticItemList])

  const prescribe = (items) => {
    props.prescribe(items);
    props.handleClose();
  }

  const addItem = (item) => {
    const compare = prescriptionItems.findIndex((obj) => obj.testdataid === item.testdataid);
    if(compare >= 0){
      alert("이미 처방받았습니다.");
    } else {
      setPrescriptionItems((prevItems) => {
        const newItems = prevItems.concat(item);
        return newItems;
      });
    }
  }

  const addPackage = (item) => {
    // console.log(item);
    setPrescriptionItems((prevItems) => {
      let newItems = prevItems.filter(prevItem => prevItem.groupcode !== item.groupcode);
      newItems = newItems.concat(item.tests);
      return newItems;
    })
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
              <div style={{width:"20%"}}>묶음코드</div>
              <div style={{width:"20%"}}>묶음명</div>
              <div style={{width:"20%"}}>처방코드</div>
              <div style={{width:"20%"}}>처방명</div>
              <div style={{width:"20%"}}></div>
            </div>
            <div className="overflow-auto border" style={{height:"460px"}}>
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
            <div style={{height:"550px"}}>
              <Tab.Container defaultActiveKey="wait">
                <Nav fill variant="tabs" className="flex-column">
                  <Row className="ml-0 mr-0 pt-1">
                    <Nav.Item>
                      <Nav.Link eventKey="wait">개별 처방</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="complete">묶음 처방</Nav.Link>
                    </Nav.Item>
                  </Row>
                </Nav>
                <Tab.Content  style={{height:"500px"}}>
                  <Tab.Pane eventKey= "wait" className="pt-1">
                  <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
                    <div style={{width:"20%"}}>묶음코드</div>
                    <div style={{width:"20%"}}>묶음명</div>
                    <div style={{width:"20%"}}>처방코드</div>
                    <div style={{width:"20%"}}>처방명</div>
                    <div style={{width:"20%"}}></div>
                  </div>
                  <div className="overflow-auto border" style={{height:"460px"}}>
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
                            <div style={{width:"20%"}}><button className="btn btn-success btn-sm" onClick={() => {addItem(item)}}>추가</button></div>
                          </div>
                        );
                      }
                    })} 
                  </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="complete" className="pt-1">
                    <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
                      <div style={{width:"40%"}}>묶음코드</div>
                      <div style={{width:"40%"}}>묶음명</div>
                      <div style={{width:"20%"}}></div>
                    </div>
                    <div className="overflow-auto border" style={{height:"460px"}}>
                      {groupTests != null &&
                      Object.values(groupTests).map ((item, index) => {
                          return (
                            <div key={item.groupcode} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
                              <div style={{width:"40%"}}>{item.groupcode}</div>
                              <OverlayTrigger placement="right"
                                  overlay={<Tooltip>{item.groupname}</Tooltip>}>
                                <div style={{width:"40%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.groupname}</div>
                              </OverlayTrigger>
                              <div style={{width:"20%"}}><button className="btn btn-success btn-sm" onClick={() => {addPackage(item)}}>추가</button></div>
                            </div>
                          );
                      })}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
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