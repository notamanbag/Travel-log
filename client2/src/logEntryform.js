// eslint-disable-next-line
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {createEntry} from './API'

const LogEntryform = ({location,onClose})=>{
    const {register,handleSubmit} = useForm();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('')

    const onSubmit = async (data) =>{
        
            try {
                setLoading(true);
                data.latitude = location.latitude; 
                data.longitude = location.longitude; 
                console.log(data);
                const created = await createEntry(data);
                console.log(created);
                onClose();
            } catch (error) {
                console.log(error);
                 setError(error.message)
                 setLoading(false)
            }
           
            
            
        
        }
    return(
        <form className = "entryForm rounded" onSubmit ={handleSubmit(onSubmit)}>
        {error? <h3>{error}</h3>:null}
                <h3>CREATE TRAVEL LOG</h3>
                <label htmlFor="title">Title</label>
                <input name ="title" required ref={register}/>
                <label htmlFor= "comments">Comments</label>
                <textarea name = "comments" rows ={3} ref={register}></textarea>
                <label htmlFor= "description">Description</label>
                <textarea name = "description" rows ={3} ref={register}></textarea>
                
                <label htmlFor= "image">Image</label>
                <input name = "image" ref={register}/>
                <label htmlFor= "visitDate">VisitDate</label>
                <input name = "visitDate" type="date" required ref={register}/>
                <button disabled ={loading}>{loading ? 'Loading....' : 'Create a entry'}</button>



            </form>
            

    );
}


export default LogEntryform
