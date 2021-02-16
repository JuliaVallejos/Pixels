import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Category from './components/Category';
import Footer from './components/Footer'
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"


function App({loggedUser,login_with_LS}) {
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
<<<<<<< HEAD
      </BrowserRouter>    
=======
      </BrowserRouter >
      
>>>>>>> 7cdd8a0cc67f5813b2a6069be0e48519e80843b5
    </div>
  )
}
const mapStateToProps=(state)=>{
  return {
    loggedUser: state.user.loggedUser
  }
}
const mapDispatchToProps={
  login_with_LS: usersActions.login_with_LS
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
