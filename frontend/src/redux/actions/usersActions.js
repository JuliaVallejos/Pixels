import axios from 'axios'
import Swal from 'sweetalert2'

const usersActions = {
    createNewUser: formSignUp =>{
    return async (dispatch,getstate) => {
      try{
        const data = await axios.post("https://app-pixels.herokuapp.com/api/user/signUp",formSignUp,{
          headers: {"Content-Type": "multipart: form-data"}
        }); 
        if (data.data.success){
          dispatch({type:'LOGIN', payload:data.data.response})
        } else{
          return data
        }
        }catch(error){
          const data =[{errors:'An error occurred'}]
          return data
        }
    }
  },
  login_user: (loginUser)=>{
    return async (dispatch,getstate) => {
      try{
        const data = await axios.post("https://app-pixels.herokuapp.com/api/user/logIn",loginUser);
        
        if(data.data.success){
          dispatch({type:'LOGIN', payload:data.data.response})
          return data.data
        }else{
          console.log(data)
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
        const response= await axios.post("https://app-pixels.herokuapp.com/api/user/logInLS",{token},{
          headers:{
            Authorization: `Bearer ${token}` 
          }
        })
        if(response.data.success){
          dispatch({type:"LOGIN", payload: {...response.data.response}})
        }
      }catch(error){
        
        if(error.status===401){
          Swal.fire({
            icon: 'error',
            title: 'ACCESS DENIED!',
          })
          localStorage.clear()
          const backToHome ='/'
          return backToHome
        }else {
        return error}
        }
      
    }
  },
  recoverPassword: (password)=>{
    return async (dispatch, getstate)=>{
      try{
        const data = await axios.post('https://app-pixels.herokuapp.com/api/recoverPassword',password)
       console.log(data)
        if(data.data.success){
          dispatch({type:'RECOVERPASSWORD', payload:data.data.response})
          return data.data
        }else{
          return data.data
        }
      }catch(error){
        const data ={errors:['An error occurred']}
        return data
      }

    }
  },
  contactEmail:(email)=>{
    return async (dispatch,getstate)=>{
      try{
        const data = await axios.post('https://app-pixels.herokuapp.com/api/contact/send',email)
        
        if(data.data.success){
          dispatch({type:'CONTACTEMAIL', payload:data.data.response})
          return data.data.response
        }else{
          return data.data
        }
      }catch(error){
        const data ={errors:['An error occurred']}
        return data
      }

    }
  }
}



export default usersActions