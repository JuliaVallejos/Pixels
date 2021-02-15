import {Route,BrowserRouter,Switch} from 'react-router-dom'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Category from './components/Category';
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>        
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/test' component={Category}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
