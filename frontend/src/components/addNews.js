
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
    setErrors([])
    e.preventDefault()

  if(news.newsTitle ==='' || news.newsImg === '' || news.newsDescription === '' || news.newsBody === '' || news.newsAuthor === '' || news.dateOfTheNews === '' ){
     setErrors([{message:'All required(*) fields must be completed'}])
      return false 
  }

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
        <input type="text" placeholder="title of the news" name="newsTitle" onChange={read_input}/>
        <input type="text" placeholder="image of the news" name="newsImg" onChange={read_input}/>
        <input type="text" placeholder="description of the news" name="newsDescription" onChange={read_input}/>
        <textarea type="text" placeholder="body of the news" name="newsBody" style={{resize: "unset", height:"150px" }} onChange={read_input}/>
        <input type="text" placeholder="author of the news" name="newsAuthor" onChange={read_input}/>
        <input type="date" placeholder="yyyy-mm-dd"  name="dateOfTheNews" onChange={read_input}/>
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