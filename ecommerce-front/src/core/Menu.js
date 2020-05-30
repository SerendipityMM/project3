import React from 'react';
import {Link, withRouter} from 'react-router-dom';



const isActive = (history, path)  => {
  if(history.location.pathname === path) {
      return {color: '#d81b60 '}
  
     } else {}
     
        return {color:'#ffffff'};
  
  };
  
    const Menu = ({history}) => {
      return (<div>
        <ul className="nav nav-tabs bg-dark">
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, '/')} to="/">Home </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
          </li>
        </ul>

      </div>);
    };

    export default withRouter(Menu);