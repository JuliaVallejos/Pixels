import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header'
import Library from './pages/Library'
import News from './components/News';
import Footer from './components/Footer'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import Category from './components/Category';
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"
import Home from './components/Home'


function App({loggedUser,login_with_LS}) {
  if (!loggedUser && localStorage.getItem("token")){
    login_with_LS(localStorage.getItem("token"))
    console.log("hay usuario")
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path= "/" component={Home}/>
            <Route path='/test' component={News}/>
            <Route path='/library' component={Library}/> 
            <Route path='/categories/:category' component={CategoryList}/>
          </Switch>
        <Switch>
          {!loggedUser && 
          <>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={LogIn}/>
          </>}        
          
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </BrowserRouter >
      
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
