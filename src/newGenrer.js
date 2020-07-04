import React,{ useState } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const NewGenrer = ()=>{

    const [name,setName] = useState('')
    const [success,setSuccess] = useState(false)

    
    const onChange = evt =>{
        setName(evt.target.value)
    }

    const save = () => {
        axios.get('/api/genres',{
            name
        }).then((res)=>{
            console.log(res)
            setSuccess(true)
        }).catch((error)=>{
            console.log(error)
            console.log(success)
        })
    }

    if(success){
       return  <Redirect to='/genres'/>
    }

    return(
        <div className="container">
            <h1>New Genrer</h1>
            <form>
                <div className="form-group">
                     <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Genrer Name"/>
                </div>
                <button type='submit' className="btn btn-primary" onClick={save}>Salve</button>
            </form>
        </div>
    )
}
export default NewGenrer