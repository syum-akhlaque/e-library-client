import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import AddBooks from './Components/Home/AddBooks/AddBooks';
import EditBooks from './Components/Home/EditBooks/EditBooks';
import Login from './Components/Login/Login';
export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isLogIn: false,
    email : '',
    error: ''
  });

  return (
    <userContext.Provider value = {[loggedInUser,setLoggedInUser]} >
    <Router>
      <Switch>
        <Route exact path="/">
          <Header></Header>
          <Home/>
        </Route>

        <Route exact path="/home">
          <Header></Header>
          <Home/>
        </Route>

        <Route exact path="/login">
          <Login></Login>
        </Route>

        <Route exact path="/addBooks">
         <AddBooks></AddBooks>
        </Route> 
        

        <Route exact path="/editBooks">
         <EditBooks></EditBooks>
        </Route>

        <Route path='*'>
          <h2 className = 'text-center py-5'> 4O4  not found .......</h2>
      </Route>
      </Switch>
  </Router>
  </userContext.Provider>
  );
}

export default App;
