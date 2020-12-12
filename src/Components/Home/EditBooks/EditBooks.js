import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';

const EditBooks = () => {
    const location = useLocation();
    const history = useHistory()
    let {bookName,author,genre,releaseDate,image,id} = location.state || {};
    const [currentFile,setCurrentFile] = useState({});
    useEffect( ()=>{
        const url = 'data:image/png;base64,' + image.img;  // -------------  convert current image to js file ---------
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
        const file = new File([blob], "File name",{ type: "image/png" })
        setCurrentFile(file)
        })
    },[])

    const [file, setFile] = useState()
    const { register, handleSubmit, errors } = useForm();  
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const onSubmit = (data,e) => {
        e.preventDefault();
        const formData = new FormData() 
        formData.append('file', file ||currentFile);
        console.log(file, currentFile)
        formData.append('id', id);
        formData.append('bookName', data.bookName);
        formData.append('author', data.author);
        formData.append('genre', data.genre);
        formData.append('releaseDate', data.releaseDate);

        fetch('http://localhost:5000/editBooks', {
            method: 'PATCH',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            console.log('success')
        })
        .catch(error => {
            console.error(error)
            console.log('not send')
        })
       alert('Books updated Successfully')
       history.push({
           pathname: '/'
       })
        e.target.reset();
    }
    return (
        <div className="bg-white col-md-4 offset-md-4 p-5 add-products">
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor="bookName">Book Name</label>
                <input name="bookName" className="form-control" type="text" defaultValue={bookName}  ref={register({ required: true })} />
                {errors.bookName && <span className='error'>*Required </span>}
            </div>

            <div className="form-group">
                <label htmlFor="author">Author</label>
                <input name="author" className="form-control" defaultValue={author}type="text"  ref={register({ required: true })} />
                {errors.author && <span className='error'>*Required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input name="genre" className="form-control" defaultValue={genre} type="text"  ref={register({ required: true})} />
                {errors.genre && <span className='error'>*Required  </span>}
            </div>

            <div className="form-group">
                <label htmlFor="releaseDate">releaseDate</label>
                <input name="releaseDate" className="form-control" type="text" defaultValue={releaseDate}  ref={register({ required: true })} />
                {errors.releaseDate && <span className='error'>*Required </span>}
            </div>

            <div className="form-group">
                <label className='pl-1' htmlFor="file">Change Image </label>
                <input onChange={handleFileChange} type="file" name="file" id="" ref={register({ required: false })}/>
               {errors.file && <span className='error'>file is required </span>}
            </div>

            <button className="btn  bg-warning px-5" type='submit' >Send</button>
        </form>
    </div>
    );
};

export default EditBooks;