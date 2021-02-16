import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Category from './components/Category';
import Footer from './components/Footer'
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"


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
          {!loggedUser && 
          <>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={LogIn}/>
          </>}        
          <Route path='/test' component={Category}/>
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
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
