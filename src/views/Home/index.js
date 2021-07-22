import Notice from "./Notice";
import User from "./User";
import Photo from "./Photo";
import Calendar from "./Calendar";
import Weekly from "./Weekly";

function Home(props) {
  return (
    <div className="container-fluid row vh-100 p-3">
   <div className="col-8">
      <div className="col card p-3" style={{height:"30vh"}}>
      <Notice/>
      </div>
      <div className="p-2"></div>
      <div className="col card p-3"style={{height:"65vh"}}>
      <Weekly/>
      </div>
   </div>
   <div className="col-4">
   <div className="col p-0 pt-4" style={{height:"30vh"}}>
      <Calendar/>
      </div>
      <div className="p-2"></div>
      <div className="col p-0 pl-2 pt-3 ml-4"style={{height:"30vh"}}>
      <div className="pb-1" style={{fontSize:"20px", fontWeight:"bold"}}>Doctor's Contact Info: </div>
      <User/>
      </div>
      <div className="p-2 pt-3"></div>
      <div className="col"style={{height:"33.7vh"}}>
      <Photo/>
      </div>
   </div>
    
    </div>
  );
}

export default Home;