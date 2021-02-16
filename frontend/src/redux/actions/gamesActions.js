import axios from 'axios'

const gamesActions = {
    allGames: () =>{
        return async(dispatch,getstate) =>{
            try{
                const data = await axios.get("http://localhost:4000/api/games")
            
                if (data.data.success){
                    dispatch({type:'ALL_GAMES',payload:data.data.response})
                  return data.data.response
                } else{
                return data.data
                }
            }catch(error){
            
              const data ={errores:{details:[{message:'An error occurred'}]}}
              return error
            }}
  
        
    },
    filterGames: search => {
        return async (dispatch,getstate) => {
            dispatch({type:'FILTER',payload:search})
    }
}
}
export default gamesActions