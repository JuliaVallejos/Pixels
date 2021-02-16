import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import usersActions from "../redux/actions/usersActions"

const Footer = ({loggedUser,logOut}) => {
    return(
        <>
            <div className="footer centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`}}>
                <div className="footerLinks justifyBetween">
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
export default connect(mapStateToProps,mapDispatchToProps)(Footer)