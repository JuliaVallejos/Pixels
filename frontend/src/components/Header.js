import {NavLink} from 'react-router-dom'

const Header = () =>{
    return (
        <>
        <div id="headerContainer" className="justifyBetween">
            <div className="logo" style={{backgroundImage: `url("../assets/logo.png")`}}></div>
            <div className="links justifyBetween">
                <NavLink to ='/'><p>Home</p></NavLink>
                <NavLink to ='/library'><p>Library</p></NavLink>
                <NavLink to ='/developers'><p>Developers</p></NavLink>
                <NavLink to ='/login'><p>LogIn</p></NavLink>
                <NavLink to ='/signup'><p>SignUp</p></NavLink>
            </div>
        </div>

        </>
        
    )
}

export default Header