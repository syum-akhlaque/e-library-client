import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddBooks = () => {
    const [file, setFile] = useState({})
    const { register, handleSubmit, errors } = useForm();
    console.log(file);

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const newDate = new Date();

    const onSubmit = (data,e) => {
        e.preventDefault();
        const formData = new FormData()
       
        formData.append('file', file);
        formData.append('bookName', data.bookName);
        formData.append('author', data.author);
        formData.append('genre', data.genre);
        formData.append('releaseDate', data.releaseDate||newDate);
        formData.append('activeStatus', true);

        fetch('https://pure-peak-00823.herokuapp.com/addBooks', {
            method: 'POST',
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
        alert('Books Added Successfully')
        e.target.reset();
    }
    return (
        <div className="bg-white col-md-4 offset-md-4 p-5 add-products">
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor="bookName">Book Name</label>
                <input name="bookName" className="form-control" type="text"  ref={register({ required: true })} />
                {errors.bookName && <span className='error'>*Required </span>}
            </div>

            <div className="form-group">
                <label htmlFor="author">Author</label>
                <input name="author" className="form-control" type="text"  ref={register({ required: true })} />
                {errors.author && <span className='error'>*Required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input name="genre" className="form-control" type="text"  ref={register({ required: true})} />
                {errors.genre && <span className='error'>*Required  </span>}
            </div>

            <div className="form-group">
                <label htmlFor="releaseDate">releaseDate</label>
                <input name="releaseDate" className="form-control" type="text"  ref={register({ required: true })} />
                {errors.releaseDate && <span className='error'>*Required </span>}
            </div>

            <div className="form-group">
                <label className='pl-1' htmlFor="file">Upload Image (500*500)</label>
                <input onChange={handleFileChange} type="file" name="file" id="" ref={register({ required: true })}/>
               {errors.file && <span className='error'>file is required </span>}
            </div>

            <button className="btn  bg-warning px-5" type='submit' >Send</button>
        </form>
    </div>
    );
};

export default AddBooks;