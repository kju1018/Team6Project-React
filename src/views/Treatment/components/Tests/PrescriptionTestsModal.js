import { useCallback, useEffect, useState } from "react";
import { Accordion, Button, Card, Dropdown, DropdownButton, InputGroup, Modal, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import { AutoSizer, List } from "react-virtualized";
import PrescriptionPackageItem from "./PrescriptionPackageItem";
import PrescriptionTestItem from "./PrescriptionTestItem";

function PrescriptionTestsModal(props) {

  const [searchName, setSearchName] = useState("");
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [groupTests, setGroupTests] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [selectValue, setSelectValue] = useState("dataid");
  const [eventKey, setEventKey] = useState("test")
  useEffect(() => {
    if(props.show === true){
      setPrescriptionItems(props.itemList);
      setSearchName("");
      setSearchList(props.staticItemList);
    }
  },[props]);

  useEffect(() => {
    const groupList = [];
    props.staticItemList.reduce((gt, t) => {
      if(!gt[t.groupcode]){
        gt[t.groupcode] = {};
        gt[t.groupcode].groupcode = t.groupcode;
        gt[t.groupcode].groupname = t.groupname;
        gt[t.groupcode].tests = [];
        gt[t.groupcode].tests.push(t);
        groupList.push(gt[t.groupcode]);
      } else {
        gt[t.groupcode].tests.push(t);
      }
      return gt;
    }, {});
    setGroupTests(groupList);
    setSearchList(props.staticItemList);
  }, [props.staticItemList])

  const prescribe = useCallback((items) => {
    props.prescribe(items);
    props.handleClose();
  },[props]);

  const addItem = useCallback((item) => {  
      setPrescriptionItems((prevItems) => {
        const compare = prevItems.findIndex((obj) => obj.testdataid === item.testdataid);
        if(compare >= 0){
          alert("이미 처방받았습니다.");
          return prevItems;
        } else {
          const newItems = prevItems.concat(item);
          return newItems;
        }
      });

  },[])

  const addPackage = useCallback((item) => {
    setPrescriptionItems((prevItems) => {
      let newItems = prevItems.filter(prevItem => prevItem.groupcode !== item.groupcode);
      newItems = newItems.concat(item.tests);
      return newItems;
    })
  },[]);

  const removeItem = useCallback((item) => {
    setPrescriptionItems((prevItems) => {
      const newItems = prevItems.filter(prevItem => prevItem.testdataid !== item.testdataid);
      return newItems;
    })
  }, [])

  const search = useCallback((search) => {
    setSearchList(() => {
      const newTests = props.staticItemList.filter(test => test.testdataid.indexOf(search) !== -1);
      return newTests;
    });

  }, [props.staticItemList]);

  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PrescriptionTestItem item={searchList[index]} addItem={addItem}></PrescriptionTestItem>
      </div>
    )
  }
  
  const rowRendererPackage = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PrescriptionPackageItem item={groupTests[index]} addPackage={addPackage}></PrescriptionPackageItem>
      </div>
    )
  }
  console.log(selectValue);
  const handleSelect = (event) => {
    setSelectValue(event.target.value);
  }

  const selectNav = (key) => {
    setEventKey(key);
    setSelectValue("dataid");
  }

  return (
    <Modal animation={false} show={props.show} onHide={props.handleClose} size="xl" centered>
      <Modal.Header closeButton style={{backgroundColor:"#1B296D"} }>
        <Modal.Title style={{color:"#FFFFFF"}}>검사 처방</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="input-group d-flex pb-2 mb-1 justify-content-end border-bottom">
          <div className="d-flex">
          <select className="custom-select" style={{width:"110px"}} onChange={handleSelect}>
            <option value="dataid" selected={selectValue ==="dataid"}>처방코드</option>
            <option value="dataname" selected={selectValue ==="dataname"}>처방명</option>
            <option value="groupcode" selected={selectValue ==="groupcode"}>그룹코드</option>
            <option value="groupname" selected={selectValue ==="groupname"}>그룹명</option>
          </select>
            <input type="text" value={searchName} onChange={handleSearchName}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName)}>검색</button>
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
                      overlay={<Tooltip>{item.testdataname}</Tooltip>}>
                    <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.testdataname}</div>
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
              <Tab.Container defaultActiveKey="test">
                <Nav fill variant="tabs" onSelect={selectNav}>
                  <Nav.Item>
                    <Nav.Link eventKey="test">개별 처방</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="package">묶음 처방</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content  style={{height:"500px"}}>
                  <Tab.Pane eventKey= "test" className="pt-1">
                  <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
                    <div style={{width:"20%"}}>묶음코드</div>
                    <div style={{width:"20%"}}>묶음명</div>
                    <div style={{width:"20%"}}>처방코드</div>
                    <div style={{width:"20%"}}>처방명</div>
                    <div style={{width:"20%"}}></div>
                  </div>
                  <div className="border" style={{height:"460px"}}>
                    <AutoSizer>
                      {
                        ({width, height}) => {
                          return (
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
                  </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="package" className="pt-1">
                    <div className="d-flex text-center align-items-center" style={{height:"40px", color:"#88888D", fontWeight:"bold"}}>
                      <div style={{width:"40%"}}>묶음코드</div>
                      <div style={{width:"40%"}}>묶음명</div>
                      <div style={{width:"20%"}}></div>
                    </div>
                    <div className="border" style={{height:"460px"}}>
                    <AutoSizer>
                      {
                        ({width, height}) => {
                          return (
                            <List width={width} height={height}
                              rowCount={groupTests.length}
                              rowHeight={50}
                              rowRenderer={rowRendererPackage}
                              overscanRowCount={5}
                            />
                          )
                        }
                      }
                    </AutoSizer>
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
