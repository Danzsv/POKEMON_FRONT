import './App.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail'
import NotFound from './components/NotFound/NotFound'
import PokemonCreate from './components/PokemonCreate/PokemonCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/pokemons' component={PokemonCreate}/>
          <Route path='/pokemons/:id' component={Detail}/>
          <Route path = '/*' component={NotFound} />
      </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
