import {useState} from 'react'

const Contact = () => {
    const [errors, setErrors]= useState()
    const read_input = e =>{
        const property= e.target.name
        var value = e.target.value
        }
        const send_data= async (e) =>{
            setErrors([])
            e.preventDefault()           
        }
    return (
        <>
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`}}>
            <h2>CONTACT US</h2>
            <form>
                <input type='text'  name='userFirstName' placeholder='First Name*' onChange={read_input}/>
                <input type='text'  name='userLastName' placeholder='Last Name*' onChange={read_input}/>
                <input type='email' name='userName' placeholder='Username or Email' onChange={read_input}/>
                <label htmlFor="textarea"><p>Send Us a message</p></label>
                <textarea style={{resize:"none"}}  onChange={read_input}></textarea>
                <button className=""type='submit' onClick={send_data}>Send</button>
            </form>            
        </div>
        </>
    )
}
export default Contact