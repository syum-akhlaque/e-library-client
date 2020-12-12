import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import BooksCards from './BooksCards';
import './Home.css';
const Home = () => {

    //get ornaginazation data 
    const [books ,setBooks] = useState([]);
    const [search, setSearch] = useState('')
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    const history = useHistory();
    useEffect(() => {
      fetch('https://pure-peak-00823.herokuapp.com/allBooksBySearch?search='+search) 
          .then(response => response.json())
          .then(data => setBooks(data)); 
    }, [search]);

    const handleSearch = event=>{
       setSearch(event.target.value)
    }
   
    const handleAddBooks =()=>{
        console.log('clicked')
        history.push({ 
            pathname: '/addBooks', //redirect to home page
        });
    }

    const processNewRequest = ({bookName, _id, author})=> {  //--------------- after click place request  btn z-----------------   
       if(loggedInUser.email){
        fetch('https://pure-peak-00823.herokuapp.com/addNewBookRequest', { // fetch  for add new books request for specific user
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            author: author,
            bookName: bookName,
            email: loggedInUser.email || '',
            })
         }) 
        alert('Request placed successfully')  
       }
       else{
            history.push({
                pathname : '/login'
            })
       }
    }

    const handleDeleteBooks = (id)=>{
        fetch('https://pure-peak-00823.herokuapp.com/delete/'+id,{ //-----------fetch request for delete 
        method: 'DELETE'
      })
    .then(() => {       
       console.log('delete success');
       document.getElementById(id).style.display= 'none';
     })
     .catch(err => {
       console.error(err)
     });     
    }
    

    return (
        <div className ='home'>
            <h2>I grow by helping people in need.</h2> 
            <div className = 'search-bar'>
                <input type="text" placeholder ='Search...' onBlur = {handleSearch}/>
                <button className= 'btn btn-primary  btn-lg'> Search</button>
            </div>  

           {(loggedInUser.email==='arssyum@gmail.com') &&  <div>
                <button className= 'btn btn-warning px-5' onClick={handleAddBooks}>
                    Add New Books
                </button>
            </div>}

            <div>
                <Container>
                    <Row>
                    {
                        !books.length &&   //---------- show loading until find data ------------
                        <div className="d-flex align-items-center">
                            <strong>Loading...</strong>
                            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    }
                        { //-----Show all organization list----
                           books.map( books => <BooksCards key={books._id} books = {books} processNewRequest={processNewRequest} handleDeleteBooks={handleDeleteBooks}>
                           </BooksCards> )
                        }       
                    </Row>  
                </Container>
            </div>
        </div>
    );
};

export default Home;
