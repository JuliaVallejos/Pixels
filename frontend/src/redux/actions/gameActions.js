import axios from 'axios'

const gameActions = {

    submitNewGame: newGame => {
        return async (dispatch,getstate) => {
        try{
            const data = await axios.post("http://localhost:4000/api/games",newGame);
            if (data.data.success){
              dispatch({type:'NEW_GAME', payload:data.data.response})
              return data.data.response
            } else{
            return data.data
            }
        }catch(error){
          const data ={errores:{details:[{message:'An error occurred'}]}}
          return data
        }}},

        gamesList: () =>{
          return async (dispatch, getState) => {
            try{
              const data = await axios.get('http://localhost:4000/api/games')
              if(data.data.success){
                dispatch({type:"ALL_GAMES", payload:data.data.response})
                return data.data.response
              } else{
                return data.data
              }
          }catch(error){
            const data ={errores:{details:[{message:'An error occurred'}]}}
            return data
          }}}
}
export default gameActions