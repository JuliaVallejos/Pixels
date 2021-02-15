import {NavLink} from 'react-router-dom'
const Footer = () => {
    return(
        <>
            <div className="footer centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`}}>
                <div className="footerLinks justifyBetween">
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
export default Footer