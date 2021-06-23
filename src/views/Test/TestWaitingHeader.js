import { Nav, Row, Tab } from "react-bootstrap";

function TestWaitingHeader() {
  return (
  <>
    <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
      <Nav fill variant="tabs" className="flex-column mb-2">
        <Row className="ml-0 mr-0">
          <Nav.Item>
            <Nav.Link eventKey="total">전체<diV>12</diV></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="wait">대기<diV>4</diV></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="progress">진행중<diV>2</diV></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="complete">완료<diV>40</diV></Nav.Link>
          </Nav.Item>
        </Row>
      </Nav>
      <Tab.Content className="overflow-auto">
      </Tab.Content>
    </Tab.Container>

    <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ backgroundColor:"#ffffff", boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
      <div className="col-2 p-0 pt-1 pb-1 text-center">순서</div>
      <div className="col-3 p-0 text-center">번호</div>
      <div className="col-2 p-0 text-center">성별/나이</div>
      <div className="col-2 p-0 text-center">이름</div>
      <div className="col-3 p-0 text-center">상태</div>
    </div>
  </>
  );
}
export default TestWaitingHeader;