import {NavLink,Link} from 'react-router-dom'
import {connect} from "react-redux"
import Swal from "sweetalert2"
import usersActions from "../redux/actions/usersActions"

const Footer = ({loggedUser,logOut}) => {
    return(
        <>
            <div className="footer centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`}}>
                <div className="footerLinks justifyBetween">
                    <NavLink exact to='/'><p>Home</p></NavLink>
                    <NavLink to='/library'><p>Library</p></NavLink>
                    <NavLink to='/news'><p>News</p></NavLink>
                    <NavLink to='/Contact'><p>Contact</p></NavLink>
                    {(loggedUser && loggedUser.userRol==="Developer")
                    ? <NavLink exact to='/developers'><p>Developers</p></NavLink>
                    : <Link onClick={()=> Swal.fire({
                        icon: 'warning',
                        title: 'Attention!',
                        text: 'You need to login with a developer account!',
                      })} exact to='/'><p>Developers</p></Link>
                    }
                    {loggedUser===null
                    ? <>
                        <NavLink to='/login'><p>LogIn</p></NavLink>
                        <NavLink to='/signup'><p>SignUp</p></NavLink>
                    </>
                    :   <NavLink to="/" onClick={logOut}>LogOut</NavLink>
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