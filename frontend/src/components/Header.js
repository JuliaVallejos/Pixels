import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import usersActions from "../redux/actions/usersActions"
import Hamburger from 'hamburger-react'
import {useState} from 'react'

const Header = ({loggedUser,logOut}) =>{
    console.log(loggedUser)
    const [isOpen, setOpen] = useState(false)
    return (
        <>
        <div id="headerContainer" className="justifyBetween">
            <div className="logo" style={{backgroundImage: `url("../assets/logo.png")`}}></div>
            <div className="links justifyBetween">
                <NavLink exact to ='/'><p>Home</p></NavLink>
                <NavLink to ='/library'><p>Library</p></NavLink>
                {(loggedUser && loggedUser.userRol==="Developer")
                ? <>
                <NavLink to ='/developers'><p>Developers</p></NavLink>
                </>                 
                : <NavLink onClick={()=>alert("You need to be a developer")} to exact ='#'><p>Developers</p></NavLink>
                }
                {loggedUser===null
                ? <>
                    <NavLink to ='/login'><p>LogIn</p></NavLink>
                    <NavLink to ='/signup'><p>SignUp</p></NavLink>
                  </>
                :   <NavLink to ="#" onClick={logOut}>LogOut</NavLink>
                }
                {loggedUser 
                ? <><div className="userImg"style={{backgroundImage: `url(${loggedUser.userImg})`}}></div></>
                : <></>}
            </div>
        </div>
        <div id="headerResponsive">
            <div className="logo" style={{backgroundImage: `url("../assets/logo.png")`}}></div>
            <Hamburger toggled={isOpen} toggle={setOpen} color="#FFB5FF" className="hamburgerIcon" />
        </div>
        {isOpen && 
                <>
                <div className="links sideMenu justifyBetween" >
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