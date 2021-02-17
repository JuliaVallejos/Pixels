import axios from "axios"
const newsActions ={
    createNews:(news)=>{
        return async (dispatch, setStatus) =>{
            try{
                const data = await axios.post("http://localhost:4000/api/news", news);
                console.log(data)
                if (data.data.success){
                  dispatch({type:'NEW_NEWS', payload:data.data.response})
                  return data.data.response
                } else{
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
          
                      dispatch({type:'ALL_NEWS',payload:data.data.response})
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
    
                  