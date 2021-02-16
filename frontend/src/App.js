import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header'
import Library from './pages/Library'
import Footer from './components/Footer'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import DeveloperPage from './pages/DeveloperPage'
import Category from './components/Category'
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"
import AddNews from './pages/AddNews'



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
        <Route exact path='/' component={Home}/>
        <Route path='/test' component={Category}/>
        <Route path='/developers' component={DeveloperPage}/>
        <Route path='/library' component={Library}/> 
        <Route path='/news' component={AddNews}/>
          {!loggedUser && 
          <>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={LogIn}/>
          </>}        
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
