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
    }},
      
    add_comment: (newComment,idGame) =>{
    return async (dispatch,getstate) => {
       
        const token = getstate().user.loggedUser? getstate().user.loggedUser.token : ''
        
        try{
        const data = await axios.post(`http://localhost:4000/api/games/${idGame}`,{newComment},
        {
            headers:{
            Authorization: `Bearer ${token}`
            }})
        
        if (data.data.success){
            dispatch({type:'CHANGES', payload:data.data.game})
            return data
        }
          
    } catch(error){
      
    if(error.response)
      {if(error.response.status===401){
       
       const data = {error:'Please Login to Comment'}
       
        return data}
      }else {
      return error}
    }
    }},
    editComment: (idGame,idComment,editedComment) =>{
        return async (dispatch,getstate) => {
        try{
            
            const data = await axios.put(`http://localhost:4000/api/itineraries/${idGame}/${idComment}`,{editedComment})
            if (data.data.success){
            dispatch({type:'CHANGES', payload:data.data.itinerary})
            return data
            }  
        } catch(error){
        const data ={errores:{details:[{message:'An error occurred'}]}}
        return data
        }
        
    }},
    deleteComment: (idGame,idComment)=>{
        return async (dispatch,getstate) => {
        try{
        const data = await axios.delete(`http://localhost:4000/api/itineraries/${idGame}/${idComment}`)
        if (data.data.success){
            dispatch({type:'CHANGES', payload:data.data.game})
            return data
        }  }  
        catch(error){
        
        const data ={errores:{details:[{message:'An error occurred'}]}}
        return data
        
    }}},
    setValoration: (idGame,bool) =>{
        return async (dispatch,getstate) =>{
        const idUser = getstate().user.loggedUser._id
        if (bool==='true')
            try{
            const data = await axios.post(`http://localhost:4000/api/valoration/${idGame}`,{idUser})
            if (data.data.success){
               
                dispatch({type:'CHANGES', payload:data.data.game})
                return data
            }}  
            catch(error){
            return error
        }else  {
       
            try{
            
            const data = await axios.delete(`http://localhost:4000/api/valoration/${idGame}`,{data:{idUser}})
            if (data.data.success){
               
                dispatch({type:'CHANGES', payload:data.data.game})
                return data
            }}  
            catch(error){
            return error
            }
        }
    }
    
}}
export default gamesActions