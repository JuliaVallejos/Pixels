const EnterNewPassword = () => {

    const readInput= e =>{
        const property = e.target.name
        var value = e.target.value
    }
    return(
        <>
        <div className="signUp centerCenter" style={{backgroundImage: `url("../assets/bricks.jpg")`, height: "65vh"}}>
            <h2>Enter your New Password</h2>
            <form>
                <input type='email' name="userName" placeholder="Enter your mail"></input>
                <input type='pasword' name="userName" placeholder="Enter your new password"></input>
                <button >Send</button>
                <p className="centerCenter">Your password will be reseted.</p>
            </form>
            
        </div>
        </>
    )
}

export default EnterNewPassword