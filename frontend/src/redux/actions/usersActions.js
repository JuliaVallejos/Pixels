import axios from 'axios'
const usersActions = {
    createNewUser: (formSignUp) =>{
    return async (dispatch,getstate) => {
      
      const response= await axios.post("http://localhost:4000/api/user/signUp",formSignUp,{
        headers: {"Content-Type": "multipart: form-data"}})
      if(!response.data.sucess){
        return response.data
      }
      dispatch({type:'LOGIN', payload:response.data.response})
      
      
      
      // axios.post("http://localhost:4000/api/user/signUp",formSignUp,{
      //     headers: {"Content-Type": "multipart: form-data"}
      // })
      // .then(data=>{
      //   console.log(data.data)
      //   if(data && data.data.sucess ){
      //     dispatch({type:'LOGIN', payload:data.data.response})
      //   }else {
      //     return data.data
      //   }})
      // .catch(error=>{
      //   console.log("catch del user action")
      // })
    }
  },
  login_user: (loginUser)=>{
    return async (dispatch,getstate) => {
      try{
        const data = await axios.post("http://localhost:4000/api/user/logIn",loginUser);
        console.log(data.data.response)
        if(data.data.sucess){
          dispatch({type:'LOGIN', payload:data.data.response})
        }else{
          return data.data
        }
      }catch(error){
        const data ={errors:['An error occurred']}
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
        const response= await axios.post("http://localhost:4000/api/user/logInLS",{token},{
          headers:{
            Authorization: `Bearer ${token}` 
          }
        })
        if(response.data.sucess){
          dispatch({type:"LOGIN", payload: {...response.data.response}})
        }
      }catch(error){
        console.log(error)
        if(error.response.status===401){
          alert("Access denied")
          localStorage.clear()
        }
      }
    }
  }
}



export default usersActions