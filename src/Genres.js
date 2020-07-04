import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

const Genres= ()=>{
    const [data,setData] = useState([])

    useEffect(()=>{
        Axios.get('/api/genres')
        .then((res) =>{
            setData(res.data.data)
        })
    },[])


    const renderLine = record=>{
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button onClick={()=>deleteGenrer(record.id)} className="btn btn-danger">Deletar</button>
                    <Link to={'/genres/'+record.id} className="btn btn-warning">Editar</Link>
                </td>
                
                </tr>
        )
    }

    const deleteGenrer =(id)=>{
        Axios.delete('/api/genres/'+id)
        .then((res)=>{
            const filtrado = data.filter(item => item.id!==id )
            setData(filtrado)

        })
    }

    if(data.length===0){
        return (
            <div className="container">
            <h1>Genrer</h1>
            <div className="alert alert-warning" role="alert">
                The list is empty!
            </div>
            </div>
        )
    }

    

    return (
        <div className='container'>
            <h1>Genrer</h1>
            <div><Link to="/genres/new" className="btn btn-primary">New Genrer</Link></div>

            <table className="table table-dark">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(renderLine)}
            </tbody>
            </table>
        </div>

    
    )
  }

export default Genres