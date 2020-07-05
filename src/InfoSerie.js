import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match})=>{

    const [form,setForm] = useState({})
    const [success,setSuccess] = useState(false)
    const [data,setData] = useState({})
    const [mode,setMode] = useState('EDIT')
    const [genres,setGenres] = useState([])
    const [genreId, setGenreId] = useState('')


    useEffect(()=>{
        
        console.log(match.params.id)
        axios.get('/api/series/'+ match.params.id)
        .then((res)=>{
            setData(res.data)
            setForm(res.data)
        }).catch(e=>{
            console.log(e)
        })
    },[match.params.id])

    useEffect(()=>{
        axios.get('/api/genres')
        .then((res)=>{
            setGenres(res.data.data)
            const genres = res.data.data
            const encontrado = genres.find(value=>data.genre=== value.name)
            if(encontrado){
                setGenreId(encontrado.id)
            }
        })

    },[data])


    //Custom header
    const masterHeader = {
        height:'50vh',
        minHeight:'500px',
        backgroundImage:`url('${data.background}')`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
    }
    


    const onChange = field => evt =>{
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value=>()=>{
        setForm({
            ...form,
            status:value
        })
    }

    const save = () => {
        axios.put('/api/series/'+match.params.id,{
            ...form,
            genre_id:genreId
        }).then((res)=>{
            console.log(res)
            setSuccess(true)
        }).catch((error)=>{
            console.log(error)
            console.log(success)
        })


    }

    if(success){
      // return  <Redirect to='/series'/>
    }

    return(
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className="h-100 container">
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' alt={data.nome} src={data.poster}/>
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'>Para Assistir</Badge>
                                    Genero:{data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div>
                <button className="btn btn-primary" onClick={()=>{setMode('EDIT')}}> Editar</button>
            </div>

            {
                mode==='EDIT' &&
            <div className="container">
            <pre>{JSON.stringify(form)}</pre>
                <h1>Nova Serie</h1>
                <button className="btn btn-primary" onClick={()=>{setMode('INFO')}}> Cancelar Edição</button>

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Serie Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Comentários</label>
                        <input type="text" value={form.coments} onChange={onChange('coments')} className="form-control" id="name" placeholder="Serie Name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Genero</label>
                        <select className="form-control" onChange={onChange('genre_id')} >
                          {genres.map(genres=>  <option key={genres.id} value={genres.id} selected={genres.id===form.genre}>{genres.name}</option> )}
                         </select>
                  </div>

                  <div className="form-check">
                  <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO"  onClick={seleciona('ASSISTIDO')}/>
                  <label className="form-check-label" htmlFor="assistido">
                    Assistido
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA ASSISTIR" onClick={seleciona('PARA_ASSISTIR')}/>
                  <label className="form-check-label" htmlFor="paraAssistir">
                    Para assistir
                  </label>
                </div>



                    <button type='submit' className="btn btn-primary" onClick={save}>Salve</button> 
                </form>
            </div>

            }
        </div>
    )
}
export default InfoSerie