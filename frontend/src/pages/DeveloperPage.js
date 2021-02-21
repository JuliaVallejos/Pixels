import {useState,useEffect} from 'react'
import AddNew from '../components/AddNew'
import AddGame from '../components/AddGame'


const DeveloperPage = (props) =>{
    const [section, setSection] = useState(true)

    const changeSection = () => setSection (!section)

    return(
        <> 
        <div className="developerContainer signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>

            <div className="developerSection">
            {!section ? 
            <>
            <div  className="headerDeveloper">
                <div className="links justifyEvenly optionsDevelopers  ">
                    <p onClick={changeSection}>ADD GAME</p>
                    <p>ADD NEWS</p>
                </div>
            </div>
            <AddNew/> 
            </>
            : 
            <>
            <div className="headerDeveloper">
                <div className="links justifyEvenly optionsDevelopers  ">
                    <p>ADD GAME</p>
                    <p onClick={changeSection}>ADD NEWS</p>
                </div>
            </div>
            <AddGame/>
            </>
            }
            </div>
    
        </div>
        </>
    )
}


export default DeveloperPage