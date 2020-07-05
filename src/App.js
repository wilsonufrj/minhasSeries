import React,{
 
} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


import Header from './Header'
import Genres from './Genres'
import newGenrer from './newGenrer'
import EditGenres from './EditGenres'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie';


const Home= ()=>{
  return <h1>Home</h1>
}



function App() {
    
  return (
    <Router>
      <div>
        <Header/>
        <Switch> 
        <Route path='/' exact component={Home} />
        <Route path='/genres' exact component={Genres}/>
        <Route path='/genres/new' exact component={newGenrer}/>
        <Route path='/genres/:id' exact component={EditGenres}/>
        <Route path='/series' exact component={Series}/>
        <Route path='/series/novo' exact component={NovaSerie}/>
        <Route path='/series/:id' exact component={InfoSerie}/>

        </Switch>
      </div>
    </Router>
  )
}

export default App;
