import {Route,BrowserRouter,Switch} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import News from './components/News';
import HomePage from './pages/HomePage';
import DeveloperPage from './pages/DeveloperPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Header/>
        <Route exact path='/' component={HomePage}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/test' component={News}/>
        <Route path='/developer' component={DeveloperPage}/>
        <Redirect to="/"/>  
        <Footer/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
