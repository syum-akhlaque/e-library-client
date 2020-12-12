import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';

const BooksCards = (props) => {
    const {bookName,image, _id, author,genre,releaseDate} = props.books || '';
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    const [activeStatus,setActiveStatus]=  useState(props.books.activeStatus)
    const processNewRequest = props.processNewRequest;
    const handleDeleteBooks=  props.handleDeleteBooks;
    
    const history = useHistory()
    const handleUpdateStatus =(id)=>{  // change active and deactive status
        const updatableStatusData = { 
            id : id,
            activeStatus: !activeStatus,
            }
        const updateOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatableStatusData)
          }
        fetch('https://pure-peak-00823.herokuapp.com/updateStatus',updateOptions)
    }
   
    const handleEditBooks = (id)=>{
       
        history.push({ 
            pathname: '/editBooks', 
           state: { 
            bookName : bookName,
            author : author,
            genre: genre,
            releaseDate:releaseDate,
            image: image,
            id:id

            }
        });
    }
    const btnColorList = [
        "bg-secondary",
        "bg-warning",
        "bg-info", 
        "bg-danger",
        "bg-primary",
        "bg-success",    
    ]
    
    const handleRandomBtnColor = ()=>{
        const colorIndex = Math.floor(Math.random()*6); //returns a random integer from 0 to 5
        return colorIndex;
    }
    const bgColor = btnColorList[handleRandomBtnColor()];
    return (
        <>       
           {(loggedInUser.email=== 'arssyum@gmail.com')? <> 
            <div className="col-md-3 p-2" id= {_id}>
                <div className="card" >
                    <div className="card-body" >
                    <img className='card-img-top' src={"data:image/png;base64," + image.img} alt='img'/>
                       <div className={bgColor+ ' p-3 text-white'}>
                             <p className="card-title pt-1 ">{bookName}</p>
                       </div>
                    </div>
                    <div className="overlay bg-primary">
                        <div className = 'librarian-action bg-light py-1 px-3'>    

                            <input style={{cursor:'pointer'}} type="checkbox" name="activeStatus" id="activeStatus" onClick={()=>{setActiveStatus(!activeStatus)}} defaultChecked = {activeStatus} onChange= {()=>{handleUpdateStatus(_id)}} /> 

                            <FontAwesomeIcon style={{color: 'blue', cursor:'pointer'}}  onClick={()=>{handleEditBooks(_id)}} icon={faEdit} /> &nbsp;&nbsp;

                            <FontAwesomeIcon style={{color: 'red', cursor:'pointer'}} onClick={()=>{handleDeleteBooks(_id)}} icon={faTrash} />  

                        </div>
                    </div>
                </div>    
           </div></>
           : <>
            {(activeStatus) && <div className="col-md-3 p-2" id= {_id}>
                <div className="card" >
                    <div className="card-body" >
                        <img className='card-img-top' src={"data:image/png;base64," + image.img} alt='img'/>
                        <div className={bgColor+ ' p-3 text-white'}>
                                <p className="card-title pt-1 ">{bookName}</p>
                        </div>
                    </div>
                    <div className="overlay">
                        <button className="btn btn-warning" onClick={()=>processNewRequest(props.books)}><FontAwesomeIcon icon={faPlus} /> Place Request</button>
                    </div>
                </div>    
            </div>}
            </>
           
        }
        </>
    );
};
export default BooksCards;