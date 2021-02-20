import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import usersActions from "../redux/actions/usersActions"
import { TiSocialInstagram, TiSocialLinkedin, TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';

const Footer = ({loggedUser,logOut}) => {
    return(
        <>
            <div className="footer centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`}}>
                <div className="footerLinks justifyBetween">
                    <NavLink exact to='/'><p>Home</p></NavLink>
                    <NavLink to='/library'><p>Library</p></NavLink>
                    <NavLink to='/news'><p>News</p></NavLink>
                    
                    <div>
                    <NavLink to='/Contact'><p>Contact</p></NavLink>
                        <div className="redesSociales">
                            <TiSocialInstagram/>
                            <TiSocialLinkedin/>
                            <TiSocialFacebook/>
                            <TiSocialTwitter/>
                        </div>
                    </div>
                    
                    {(loggedUser && loggedUser.userRol==="Developer")
                    ? <NavLink to='/developers'><p>Developers</p></NavLink>
                    : <NavLink onClick={()=>alert("You need to be a developer")} exact to='#'><p>Developers</p></NavLink>
                    }
                    {loggedUser===null
                    ? <>
                        <NavLink to='/login'><p>LogIn</p></NavLink>
                        <NavLink to='/signup'><p>SignUp</p></NavLink>
                    </>
                    :   <NavLink to="#" onClick={logOut}>LogOut</NavLink>
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