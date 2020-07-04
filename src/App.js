import React,{
  useEffect,
  useState
} from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Axios from 'axios'

import Header from './Header'
import Genres from './Genres'
import newGenrer from './newGenrer'
import EditGenres from './EditGenres'


const Home= ()=>{
  return <h1>Home</h1>
}



function App() {

  const [data,setData] = useState({})
  useEffect(()=>{
      Axios.get('/api').then((res)=>{
        setData(res.data)
      })
  },[])

  
  
  return (
    <Router>
      <div>
        <Header/>
        <Route path='/' exact component={Home} />
        <Route path='/genres/:id' exact component={EditGenres}/>
        <Route path='/genres' exact component={Genres}/>
        <Route path='/genres/new' exact component={newGenrer}/>

        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App;
