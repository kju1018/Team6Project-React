import './App.css';
import AppRoute from './AppRoute';
import AppMenu from 'AppMenu';

function App() {
  return (
    <div className="d-flex flex-column vh-100" style={{width:"1920px", backgroundColor:"#F4F4F4"}}>
      <div className="flex-grow-1 container-fluid pl-0 pr-0">
        <div className="row h-100 mr-0 ml-0">
          <div className="col-1 pl-0 border-right align-items-end" style={{position:"relative", backgroundColor:"#FFFFFF"}}>
            <AppMenu/>
          </div>
          <div className="col-11 pl-0 pr-0" >
            <AppRoute/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


//  <div className="col-1 pl-0 border-right border-gray align-items-end text-bottom" style={{position:"relative", backgroundColor:"#FFFFFF"}}>