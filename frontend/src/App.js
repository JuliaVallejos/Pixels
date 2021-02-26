import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {useState} from 'react'
import Header from './components/Header'
import Library from './pages/Library'
import Footer from './components/Footer'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import CategoryList from './pages/CategoryList'
import Home from './pages/Home'
import DeveloperPage from './pages/DeveloperPage'
import usersActions from "./redux/actions/usersActions"
import WhatsApp from "./components/WhatsApp"
import Contact from "./pages/Contact"
import AddNew from './components/AddNew'
import gameById  from './components/GameById'
import News from './pages/News'
import EnterNewPassword from './components/EnterNewPassword'
import PasswordReset from './pages/PasswordReset'
import Commentary from './components/Commentary'
import NewsById from './components/NewsById'


function App({loggedUser,login_with_LS}) {

  const [renderAgain,setRenderAgain] = useState(false)
  var routes=null
/* 
  if (!loggedUser && localStorage.getItem("token")){
    login_with_LS(localStorage.getItem("token"))
  
  } */
  if(!loggedUser && localStorage.getItem("token")){
   console.log('sooy ls')
   login_with_LS(localStorage.getItem('token'))
   .then(backToHome => 
     {
       if(backToHome==='/'){
       setRenderAgain(!renderAgain)}
       
   })
   .catch(error => setRenderAgain(!renderAgain))
 }
  if(!loggedUser){
    routes=
  <>
    <Route exact path='/' component={Home}/>
    <Route path='/contact' component={Contact}/>
    <Route path='/library' component={Library}/> 
    <Route path='/categories/:category' component={CategoryList}/> 
    <Route path='/games/:id' component={gameById}/>
    <Route exact path='/news' component={News}/>
    <Route exact path='/news/:id' component={NewsById}/>
    <Route exact path='/signup' component={SignUp}/>
    <Route exact path='/login' component={LogIn}/>
    <Route path='/passwordReset' component={PasswordReset}/>
    <Route exact path='/enterNewPassword' component={EnterNewPassword}/>
    <Redirect to='/'/> 
  </>
   }
  if(loggedUser){
    routes=
    <>
       <Route exact path='/' component={Home}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/library' component={Library}/> 
        <Route path='/categories/:category' component={CategoryList}/> 
        <Route path='/games/:id' component={gameById}/>
        <Route exact path='/news/:id' component={NewsById}/>
        <Route exact path='/news' component={News}/>
        <Redirect to='/'/> 
       
     

    </>
 
  }
  if(loggedUser && loggedUser.userRol==="Developer"){
   routes=
    <>
    <Route exact path='/' component={Home}/>
    <Route path='/contact' component={Contact}/>
    <Route path='/library' component={Library}/> 
    <Route path='/categories/:category' component={CategoryList}/> 
    <Route path='/games/:id' component={gameById}/>
    <Route exact path='/news' component={News}/>
    <Route exact path='/news/:id' component={NewsById}/>
    <Route path='/commentary' component={Commentary}/>
    <Route exact path='/developers' component={DeveloperPage}/>
    <Route exact path='/addnews' component={AddNew}/>
    <Redirect to='/'/> 


    </>

  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>   
        {routes}
        </Switch>
        <WhatsApp/>
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
