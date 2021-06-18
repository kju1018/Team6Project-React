import { Doughnut } from "react-chartjs-2";

function Chart() {
  const expData = {
    datasets: [
      {
        data: [60, 13, 27],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)"
        ],
        fill: true
      }
    ]
  };

  const expData1 = {
    datasets: [
      {
        data: [60, 40],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)"
        ],
        fill: true
      }
    ]
  };
  
  return (
    <div className="row mt-3 mb-2">
            <div className="col-6 p-0 pr-1">
              <div className="card">
                <div className="card-header" style={{height: "40px"}}>검사 대기 현황</div>
                <div className="card-body">
                  <div className="row">
                    <div style={{width:"140px", marginLeft:"13px"}}>
                    <Doughnut
                      data={expData}
                      width={200}
                      height={120}
                    />
                    </div>
                    <div style={{marginTop:"70px", marginLeft:"60px"}}>
                        <div className="row mb-1" style={{height:"16px"}}><div className="mt-1 mr-1" style={{backgroundColor:"rgba(238, 102, 121, 1)", width:"32px", height:"16px"}}></div><div style={{height:"16px"}}>대기</div></div>
                        <div className="row mb-1" style={{height:"16px"}}><div className="mt-1 mr-1" style={{backgroundColor:"rgba(98, 181, 229, 1)", width:"32px", height:"16px"}}></div><div style={{height:"16px"}}>진행중</div></div>
                        <div className="row" style={{height:"16px"}}><div className="mt-1 mr-1" style={{backgroundColor:"rgba(255, 198, 0, 1)", width:"32px", height:"16px"}}></div><div style={{height:"16px"}}>완료</div></div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 p-0 pl-1">
              <div className="card">
                <div className="card-header" style={{height: "40px"}}>결과 입력 현황</div>
                <div className="card-body">
                  <div className="row">
                      <div style={{width:"140px", marginLeft:"13px"}}>
                      <Doughnut
                        data={expData1}
                        width={200}
                        height={120}
                      />
                      </div>
                      <div style={{marginTop:"91px", marginLeft:"60px"}}>
                        <div className="row mb-1" style={{height:"16px"}}><div className="mt-1 mr-1" style={{backgroundColor:"rgba(238, 102, 121, 1)", width:"32px", height:"16px"}}></div><div style={{height:"16px"}}>미입력</div></div>
                        <div className="row" style={{height:"16px"}}><div className="mt-1 mr-1" style={{backgroundColor:"rgba(98, 181, 229, 1)", width:"32px", height:"16px"}}></div><div style={{height:"16px"}}>완료</div></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
  );
}
export default Chart;