import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

const Series= ()=>{
    const [data,setData] = useState([])

    useEffect(()=>{
        Axios.get('/api/series')
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
                    <button onClick={()=>deleteSeries(record.id)} className="btn btn-danger">Deletar</button>
                    <Link to={'/series/'+record.id} className="btn btn-warning">Info</Link>
                </td>
                
                </tr>
        )
    }

    const deleteSeries =(id)=>{
        Axios.delete('/api/series/'+id)
        .then((res)=>{
            const filtrado = data.filter(item => item.id!==id )
            setData(filtrado)

        })
    }

    if(data.length===0){
        return (
            <div className="container">
            <h1>Series</h1>
            <div><Link to="/series/novo" className="btn btn-primary">Nova Serie</Link></div>

            <div className="alert alert-warning" role="alert">
                The list is empty!
            </div>
            </div>
        )
    }

    

    return (
        <div className='container'>
            <h1>Series</h1>
            <div><Link to="/series/novo" className="btn btn-primary">Nova Serie</Link></div>

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

export default Series