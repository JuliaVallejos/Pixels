import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header'
// import Library from './pages/Library'
import News from './components/News'
import Footer from './components/Footer'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import News from './components/News'
import HomePage from './pages/HomePage'
import DeveloperPage from './pages/DeveloperPage'
import Category from './components/Category'
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"


function App({loggedUser,login_with_LS}) {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/test' component={News}/>
        <Route path='/developer' component={DeveloperPage}/>
        <Route path='/library' component={Library}/> 
        <Redirect to='/'/>  
        </Switch>
        <Footer/>
      </BrowserRouter>    

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
