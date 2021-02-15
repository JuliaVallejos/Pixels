import axios from 'axios'
const usersActions = {
    createNewUser: newUser => {
        return async (dispatch,getstate) => {
        try{
            const data = await axios.post("http://localhost:4000/api/user/signUp",newUser);
            if (data.data.success){
              dispatch({type:'LOGIN', payload:data.data.response})
              return data.data.response
            } else{
            return data.data
            }
        }catch(error){
          const data ={errores:{details:[{message:'An error occurred'}]}}
          return data
        }}},
        login_user:loginUser=>{
            return async (dispatch,getstate) => {
              try{
                const data = await axios.post("http://localhost:4000/api/user/logIn",loginUser);
                if (data.data.success){
                  dispatch({type:'LOGIN', payload:data.data.response})
                  return data.data.response
                } else{
                
                return data.data
                }
            }catch(error){
            
              const data ={errores:{details:[{message:'An error occurred'}]}}
              return data
            }}}

    }



export default usersActions