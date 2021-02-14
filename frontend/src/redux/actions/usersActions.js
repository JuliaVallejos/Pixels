import axios from 'axios'
const usersActions = {
    createNewUser: newUser => {
        return async (dispatch,getstate) => {
        console.log(newUser)
        try{
             const data = 'hola todavia no tengo api'/*await axios.post(RUTA DE NUEVO USUARIO,newUser) */
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
            console.log(loginUser)
            return async (dispatch,getstate) => {
              try{
                const data = 'hola' /* await axios.post('RUTA DE LOGIN,loginUser) */
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