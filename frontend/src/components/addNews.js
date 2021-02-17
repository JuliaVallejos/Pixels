
import { useState } from "react"
import { connect } from "react-redux"
import newsActions from "../redux/actions/newsActions"


const AddNews = (props)=>{
    const [news, setNews]=useState({})
    const [errors,setErrors] = useState([])

const read_input = e=>{
    const property= e.target.name
    const value = e.target.value
    setNews({
        ...news,
        [property]:value
    })
}


const send_data = async e=>{
    
    e.preventDefault()
  if(news.newsTitle ==='' || news.newsImg === '' || news.newsDescription === '' || news.newsBody === '' || news.newsAuthor === '' || news.dateOfTheNews === '' ){
     setErrors([{message:'All required(*) fields must be completed'}])
      return false 
  }
  setErrors([])
  const data = await props.createNews(news)
  if(data && !data.success){
    setErrors([{message:'All required(*) fields must be completed'}])
  }
}

console.log(props.news)
return(
    <>
    <div className="signUp centerCenter" style={{height: "65vh"}}>
        <h2>create your news</h2>
        <input placeholder="title of the news" name="newsTitle" onChange={read_input}></input>
        <input placeholder="image of the news" name="newsImg" onChange={read_input}></input>
        <input placeholder="description of the news" name="newsDescription" onChange={read_input}></input>
        <input placeholder="body of the news" name="newsBody" onChange={read_input}></input>
        <input placeholder="author of the news" name="newsAuthor" onChange={read_input}></input>
        <input placeholder="yyyy-mm-dd"  name="dateOfTheNews" onChange={read_input}></input>
        <button onClick={send_data}>Create News</button>
        {errors&& errors.map((error,index) =>{
                                return (<p key={index}>{error.message}</p>)
                            })}
    </div>
    </>

)
}
const mapStateToProps =state=>{
    return{
        news: state.news.news
    }
}
const mapDispatchToProps ={
    createNews: newsActions.createNews
}



 export default connect (mapStateToProps,mapDispatchToProps)  (AddNews)