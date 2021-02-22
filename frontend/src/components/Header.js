import {NavLink,Link} from 'react-router-dom'
import {connect} from "react-redux"
import usersActions from "../redux/actions/usersActions"
import Hamburger from 'hamburger-react'
import Swal from "sweetalert2"
import {useState} from 'react'

const Header = ({loggedUser,logOut}) =>{

    const [isOpen, setOpen] = useState(false)
    
    return (
        <>
        <div id="headerContainer" className="justifyBetween">
            
            <Link className="logo"  style={{backgroundImage: `url("../assets/logo.png")`}} to ='/'></Link>
            <div className="links justifyBetween">
                <NavLink exact to='/'><p>Home</p></NavLink>
                <NavLink to='/library'><p>Library</p></NavLink>
                <NavLink to='/news'><p>News</p></NavLink>
                {(loggedUser && loggedUser.userRol==="Developer")
                    ? <NavLink exact to='/developers'><p>Developers</p></NavLink>
                    : <Link /* Redirect  */to='/' onClick={()=> Swal.fire({
                        icon: 'warning',    
                        title: 'Attention!',
                        text: 'You need to login with a developer account!',
                      })} ><p>Developers</p></Link>
                    }
                {loggedUser===null
                ? <>
                    <NavLink to='/login'><p>LogIn</p></NavLink>
                    <NavLink to='/signup'><p>SignUp</p></NavLink>
                  </>
                :   <NavLink to="/" onClick={logOut}>LogOut</NavLink>
                }
                {loggedUser 
                ? <>
                    <div className="userImg"style={{backgroundImage: `url("/userImages/${loggedUser.userImg}")`}}></div></>
                : <></>}
            </div>
        </div>
        <div id="headerResponsive">
            <Link className="logo"  style={{backgroundImage: `url("../assets/logo.png")`}} to ='/'></Link>
            <Hamburger toggled={isOpen} toggle={setOpen} color="#FFB5FF" className="hamburgerIcon" />
        </div>
        {isOpen && 
                <>
                <div id="linksResponsive" className="links sideMenu justifyBetween" >
                    <NavLink exact to='/'><p>Home</p></NavLink>
                    <NavLink to='/library'><p>Library</p></NavLink>
                    <NavLink to='/news'><p>News</p></NavLink>
                    {(loggedUser && loggedUser.userRol==="Developer")
                    ? <Link exact to='/developers'><p>Developers</p></Link>
                    : <Link onClick={()=> Swal.fire({
                        icon: 'warning',
                        title: 'Attention!',
                        text: 'You need to login with a developer account!',
                      })} exact to='#'><p>Developers</p></Link>
                    }
                    {loggedUser===null
                    ? <>
                        <NavLink to='/login'><p>LogIn</p></NavLink>
                        <NavLink to='/signup'><p>SignUp</p></NavLink>
                      </>
                    :   <NavLink to="/" onClick={logOut}>LogOut</NavLink>
                }
                </div>
                </>                
            }
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