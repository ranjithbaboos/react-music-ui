import logo from './logo.svg';
import './App.css';
//import {Home} from './Home';
import {Songs} from './Songs';

import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React JS Frontend
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">            
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/songs">
              Songs
            </NavLink>
          </li>          
        </ul>
      </nav>

      <Switch>
        
        <Route path='/songs' component={Songs}/>   
        
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
