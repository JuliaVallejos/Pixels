import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import usersActions from "../redux/actions/usersActions"

const Header = ({loggedUser,logOut}) =>{
    return (
        <>
        <div id="headerContainer" className="justifyBetween">
            <div className="logo" style={{backgroundImage: `url("../assets/logo.png")`}}></div>
            <div className="links justifyBetween">
                <NavLink to ='/'><p>Home</p></NavLink>
                <NavLink to ='/library'><p>Library</p></NavLink>
                <NavLink to ='/developers'><p>Developers</p></NavLink>
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