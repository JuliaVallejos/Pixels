import {Route,BrowserRouter,Switch} from 'react-router-dom'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import Header from './components/Header'
import News from './components/News';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={Header}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/test' component={News}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
