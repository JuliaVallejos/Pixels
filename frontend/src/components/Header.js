import {Link} from 'react-router-dom'

const Header = () =>{
    return (
        <>
        <h1>Holaaaaaaaa</h1>
        <Link to ='/login'><p>LogIn</p></Link>
        <Link to ='/signup'><p>SignUp</p></Link>
        <Link to ='/library'><p>Library</p></Link>
        </>
        
    )
}

export default Header