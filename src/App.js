import './App.css';
import AppRoute from './AppRoute';
import AppMenu from 'AppMenu';

function App() {
  return (
    <div className="d-flex flex-column vh-100" style={{width:"1920px"}}>
      <div className="flex-grow-1 container-fluid pl-0 pr-0">
        <div className="row h-100 mr-0 ml-0">
          <div className="col-2 pl-0 pr-5">
            <AppMenu/>
          </div>
          <div className="col-10 pl-0 pr-0">
            <AppRoute/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
