import React, { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Login.css'

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const { register, handleSubmit, errors } = useForm();
    
    const [newUser, setNewUser] = useState(false) 
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
      //login with user and password
      const onSubmit = user =>{
    
        if(newUser && user.email && user.password){ // create user case, if new user

          if(user.password === user.confirm_password){
               const newUserInfo = {...loggedInUser}   
               newUserInfo.isLogIn = true;
               newUserInfo.name = user.firstName +" "+user.lastName;
               newUserInfo.email = user.email;
               newUserInfo.error = '';
               setLoggedInUser(newUserInfo);
               fetch('http://localhost:5000/addNewUser', { // fetch  for add new resistered user
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ 
                   name: newUserInfo.name,
                   email: user.email,
                   password:  user.password
                   })
           }) 
              alert('Success')
              history.replace(from); 
          }
          else{ //if new new password and confirm password dont match
               const newUserInfo = {...loggedInUser}; 
               newUserInfo.error = 'Password dont match';
               setLoggedInUser(newUserInfo);
          }
        }

        if(!newUser && user.email && user.password){ // login case, if not new user 

          fetch('http://localhost:5000/checkUserInfo?email='+user.email) 
          .then(response => response.json())
          .then(data => {
           
            if(data[0].password === user.password)
            {
              const newUserInfo = {...loggedInUser};
              newUserInfo.isLogIn = true;
              newUserInfo.email = user.email;
              newUserInfo.error = '';
              newUserInfo.name = user.name;
              setLoggedInUser(newUserInfo);
            
              history.replace(from);
            }  
            else{ //if new new password email dont match
              const newUserInfo = {...loggedInUser}; 
              newUserInfo.error = 'email/Password dont match';
              setLoggedInUser(newUserInfo);
         }      
          })
          .catch(err => {
            console.error(err)
            const newUserInfo = {...loggedInUser};
            newUserInfo.error = 'Email or password is wrong';
            setLoggedInUser(newUserInfo);
          });   
            
        }
      };
  
   
  
    return (
    
        <div className = 'login-form'>
            <h4> { newUser ?  'Create an Account' :'Login'  }</h4>
            <form onSubmit={handleSubmit(onSubmit)} >
                       
                {newUser && <>  <input name="firstName" placeholder= 'First Name' ref={register({ required: true, minLength: 2 , pattern : /^([^0-9]*)$/ })} />
                {errors.firstName && <span className='error'>*Required, minimum charecters 2 and digit not allowed</span>}</>}

                {newUser && <> <input name="lastName" placeholder= 'Last Name' ref={register({ required: true,minLength: 2 , pattern : /^([^0-9]*)$/})} />
                {errors.firstName && <span className='error'>*Required, minimum charecters 2 and digit not allowed</span>}</>}

                <input name="email" type="email" defaultValue={loggedInUser.email} placeholder = "Email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                 {errors.email && <span className='error'>Email is required </span>}

                <input type="password" name="password" placeholder= 'Password' ref={register({ required: true , pattern: /(?=.*\d)(?=.*[a-z]).{6,100}$/ })} />
                {errors.password && <span className='error'>*At least 1 number,1 one lowercase latter and minimum 6 characters </span>}
          
                {newUser && <> <input type="password" name="confirm_password" placeholder= 'Confirm Password' ref={register({ required: true , pattern: /(?=.*\d)(?=.*[a-z]).{6,100}$/ })} />
                {errors.Password && <span className='error'>*Password dont match</span>}  </>}
                
                 <span className='error'>{loggedInUser.error}</span>
              
                <input type="submit" value = { newUser ?  'Create an Account' :'Login'  }/>

                <p> { newUser ?  'Already have an account?' :'Dont have an account?' } 
                <small onClick={()=>{setNewUser(!newUser) ;loggedInUser.error="" }}> {!newUser ?  'Create account' :'Login'  } </small> </p> 

            </form>  
   
        </div>
    );
};

export default Login;
