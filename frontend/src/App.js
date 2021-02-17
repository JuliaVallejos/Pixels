import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header'
import Library from './pages/Library'
import Footer from './components/Footer'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import News from './components/News'
import CategoryList from './pages/CategoryList'
import Home from './pages/Home'
import DeveloperPage from './pages/DeveloperPage'
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"



function App({loggedUser,login_with_LS}) {
  if (!loggedUser && localStorage.getItem("token")){
    login_with_LS(localStorage.getItem("token"))
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
        <Route exact path='/' component={Home}/>
        {(loggedUser && loggedUser.userRol==="Developer")
        && <Route exact path='/developers' component={DeveloperPage}/>
        }
        <Route path='/library' component={Library}/> 
        {!loggedUser && 
          <>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={LogIn}/>
          </>
        }        
        <Redirect to="/" />
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
