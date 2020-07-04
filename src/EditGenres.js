import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const EditGenres = ({match})=> {

    const [name,setName] = useState('')
    const [success,setSuccess] = useState(false)

    useEffect(()=>{
        axios.get('/api/genres/'+ match.params.id)
        .then((res)=>{
            setName(res.data.name)
        })
    },[match.params.id])

    
    const onChange = evt =>{
        setName(evt.target.value)
    }

    const save = () => {
        axios.put('/api/genres/'+ match.params.id,{
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
       return  <Redirect to = '/genres'  />
    }

    return(
        <div className="container">
            <h1>Edit Genrer</h1>
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
export default EditGenres