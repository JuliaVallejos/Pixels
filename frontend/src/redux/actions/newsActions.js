import axios from "axios"
const newsActions ={
    createNews:(formNews)=>{
        return async (dispatch, getState) =>{
            try{
                const data = await axios.post("http://localhost:4000/api/news", formNews, {
                  headers: {"Content-Type": "multipart: form-data"}
              });  
                if (data.data.success){
                  
                  dispatch({type:'NEW_NEWS', payload:data.data.response})
                  return data.data
                }else{
                  return data.data
                }
            }catch(error){
              const data ={errores:{details:[{message:'An error occurred'}]}}
              return data
            }}},
            allNews: ()=>{
              return async (dispatch, setState)=>{
                try{
                  const data = await axios.get("http://localhost:4000/api/news")
              
                  if (data.data.success){
                    dispatch({type:'ALL_NEWS',payload:data.data.response.sort((a,b)=>{return b.newsDate>a.newsDate? 1:-1})})
                    return data.data.response
                  } else{
                  return data.data
                  }
              }catch(error){
              
                const data ={errores:{details:[{message:'An error occurred'}]}}
                return error
              }}},
              newsById: (id)=>{
                return async (dispatch, setState)=>{
                  try{
                    const data = await axios.get(`http://localhost:4000/api/news/${id}`)
                console.log(data)
                    if (data.data.success){
            
                        dispatch({type:'NEWSBYID',payload:data.data.response[0]})
                      return data.data.response
                    } else{
                    return data.data
                    }
                }catch(error){
                
                  const data ={errores:{details:[{message:'An error occurred'}]}}
                  return error
                }}}
}


export default  newsActions
    
                  