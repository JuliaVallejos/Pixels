import axios from 'axios'

const gamesActions = {
    submitNewGame: (formNewGame) => {

        return async (dispatch,getstate) => {
        try{
            const data = await axios.post("http://localhost:4000/api/games", formNewGame,{
                headers: {"Content-Type": "multipart: form-data"}
            });
           
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
            dispatch({type:'FILTER', payload:search})
    }},
      
    add_comment: (comment,idGame) =>{
    return async (dispatch,getstate) => {

        console.log(idGame)
       
        const token = getstate().user.loggedUser? getstate().user.loggedUser.token : ''
        
        try{
        const data = await axios.post(`http://localhost:4000/api/games/${idGame}`,{comment},
        {
            headers:{
            Authorization: `Bearer ${token}`
            }})
        
        if (data.data.success){
            dispatch({type:'CHANGES', payload:data.data.response})
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
            dispatch({type:'CHANGES', payload:data.data.response})
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
        const data = await axios.delete(`http://localhost:4000/api/deletecomment/${idGame}/${idComment}`)
        
        if (data.data.success){
            console.log(data.data.response)
            dispatch({type:'CHANGES', payload:data.data.response})
            return data
        }  }  
        catch(error){
        
        const data ={errores:{details:[{message:'An error occurred'}]}}
        return data
        
    }}},
    setValoration: (idGame,valoration) =>{
        return async (dispatch,getstate) =>{
                console.log(valoration)
        const idUser = getstate().user.loggedUser.id
          let send_data={}

        getstate().game.gameById.valoration.map(user =>{
               if (user.idUser===idUser){
                   send_data={
                       idUser,valoration,edit:true
                   }

               }else{
                    send_data={idUser,valoration}
               }
               return send_data
           })
        
    
            try{
                
            const data = await axios.post(`http://localhost:4000/api/valoration/${idGame}`,send_data)
            if (data.data.success){
               
                dispatch({type:'CHANGES', payload:data.data.response})
                return data
            }}  
            catch(error){
            return error
        }
    }
    
},
gamesById : (id)=>{
    return async (dispatch , getstate) =>{

        try{
            const data = await axios.get(`http://localhost:4000/api/games/${id}`)
         
            if (data.data.success){
                dispatch({type:'GAMEBYID', payload:data.data.response})
                return data
            }  }  

            catch(error){
            
            const data ={errores:{details:[{message:'An error occurred'}]}}
            return data
            
        }
    }
},

mostValued : () =>{
    return async (dispatch , getstate) =>{

       const most_values = getstate().game.newGamesList.sort((a,b) => b.prom - a.prom)
        dispatch({type:'MOST_VALUED',payload:most_values}) 
}
}
}
export default gamesActions