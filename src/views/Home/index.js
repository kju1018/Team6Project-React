import Notice from "./Notice";
import User from "./User";
import Photo from "./Photo";
import Calendar from "./Calendar";
import Weekly from "./Weekly";

function Home(props) {
  return (
    <div className="container-fluid row vh-100">
   <div className="col-8">
      <div className="col card" style={{height:"30vh"}}>
      <Notice/>
      </div>
      <div className="col card"style={{height:"70vh"}}>
      <Weekly/>
      </div>
   </div>
   <div className="col-4">
   <div className="col card" style={{height:"40vh"}}>
      <Calendar/>
      </div>
      <div className="col card"style={{height:"30vh"}}>
      <User/>
      </div>
      <div className="col card"style={{height:"30vh"}}>
      <Photo/>
      </div>
   </div>
    
    </div>
  );
}

export default Home;