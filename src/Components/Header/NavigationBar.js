import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const NavigationBar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const location = useLocation();
  const currentPath = location.pathname;
    return (
        <nav className= 'white-nav'>
                <ul>
                    <li> <Link to="/home">E_LIBRARY </Link> </li>  
                    <li> <Link to="/">Home</Link></li>
                    <li> <Link  to="/">Request List</Link></li>
                     {
                        loggedInUser.isLogIn?   
                          <li>
                             <button className= 'btn btn-warning px-5' onClick={()=>setLoggedInUser({})}> Sign Out</button>     
                          </li> 
                         : 
                         <Link to="/login">
                             <button className= 'btn btn-warning px-5'> Login</button>
                        </Link>
                     }                  
                </ul>
                
            </nav>
    );
};

export default NavigationBar;