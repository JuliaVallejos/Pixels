import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header'
<<<<<<< HEAD
=======
import Library from './pages/Library'
import News from './components/News';
>>>>>>> 9e796a7fd41fc74714ef2290da3aa8cfa4272643
import Footer from './components/Footer'
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'
import Category from './components/Category';
import usersActions from "./redux/actions/usersActions"
import {connect} from "react-redux"


function App({loggedUser,login_with_LS}) {
  return (
    <div className="App">
      <BrowserRouter>
<<<<<<< HEAD
        <Header/>
        <Switch>        
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/test' component={Category}/>
=======
        <Switch>
        <Route exact path='/' component={Header}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/test' component={News}/>
        <Route path='/library' component={Library}/>
         
>>>>>>> 9e796a7fd41fc74714ef2290da3aa8cfa4272643
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
