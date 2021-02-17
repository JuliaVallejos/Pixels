import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import usersActions from "../redux/actions/usersActions"

const Header = ({loggedUser,logOut}) =>{
    console.log(loggedUser)
    return (
        <>
        <div id="headerContainer" className="justifyBetween">
            <div className="logo" style={{backgroundImage: `url("../assets/logo.png")`}}></div>
            <div className="links justifyBetween">
                <NavLink exact to ='/'><p>Home</p></NavLink>
                <NavLink to ='/library'><p>Library</p></NavLink>
                {(loggedUser && loggedUser.userRol==="Developer")
                ? <NavLink to ='/developers'><p>Developers</p></NavLink>
                : <NavLink onClick={()=>alert("You need to be a developer")} to exact ='#'><p>Developers</p></NavLink>
                }
                {loggedUser===null
                ? <>
                    <NavLink to ='/login'><p>LogIn</p></NavLink>
                    <NavLink to ='/signup'><p>SignUp</p></NavLink>
                  </>
                :   <NavLink to ="#" onClick={logOut}>LogOut</NavLink>
                }
            </div>
        </div>
        </>    
    )
}
const mapStateToProps=state=>{
    return{
        loggedUser:state.user.loggedUser
    }
}
const mapDispatchToProps={
    logOut:usersActions.logOut
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)