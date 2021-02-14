import {Link} from 'react-router-dom'

const Header = () =>{
    return (
        <>
        <div id="headerContainer" style={{backgroundColor:"#11050F"}}>
            <div className="logo" style={{backgroundImage: `url("../assets/logo")`}}></div>
            <div className="links">
                <Link to ='/login'><p>LogIn</p></Link>
                <Link to ='/signup'><p>SignUp</p></Link>
            </div>
        </div>

        </>
        
    )
}

export default Header