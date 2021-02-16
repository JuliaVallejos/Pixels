import axios from 'axios'
const usersActions = {
  createNewUser: newUser => {
    return async (dispatch,getstate) => {
      try{
        const data = await axios.post("http://localhost:4000/api/user/signUp",newUser);
        console.log(data.data.sucess)  
        if (data.data.sucess){
          dispatch({type:'LOGIN', payload:data.data.response})
        } else{
          console.log(data.data)
          return data.data
        }
        }catch(error){
          const data ={errores:{details:[{message:'An error occurred'}]}}
          return data
        }
    }
  },
  login_user: (loginUser)=>{
    return async (dispatch,getstate) => {
      try{
        const data = await axios.post("http://localhost:4000/api/user/logIn",loginUser);
        console.log(data.data)
        if (data.data.success){
            dispatch({type:'LOGIN', payload:data.data.response})
            return data.data.response
          } else{
            return data.data
          }
      }catch(error){
            
        const data ={errores:{details:[{message:'An error occurred'}]}}
        return data
      }
    }
  },
  logOut:()=>{
    return (dispatch, getState)=>{
      dispatch({type:"LOG_OUT"})
    }
  },
  login_with_LS: (token)=>{
    return async (dispatch,getState)=>{
      try{ 
        const response= await axios.post("http://localhost:4000/api/user/logIn",{token},{
          headers:{
            Authorization: `Bearer ${token}` 
          }
        })
        if(response.data.sucess){
          dispatch({type:"LOGIN", payload: {
            response:{...response.data.response}
          }})
        }
      }catch(error){
        if(error.response.status===401){
          alert("Access denied")
          localStorage.clear()
        }
      }
    }
  }
}



export default usersActions