import { date } from "joi"
import { useState } from "react"
import { connect } from "react-redux"
import newsActions from "../redux/actions/newsActions"


const AddNews = (props)=>{
    const [news, setNews]=useState({})

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
      alert('completar los campos')
      return false 
  }
  const data = await props.createNews(news)
  console.log(data)
    
}

return(
    <>
     <h1>create your news</h1>
     <input placeholder="title of the news" name="newsTitle" onChange={read_input}></input>
     <input placeholder="image of the news" name="newsImg" onChange={read_input}></input>
     <input placeholder="description of the news" name="newsDescription" onChange={read_input}></input>
     <input placeholder="body of the news" name="newsBody" onChange={read_input}></input>
     <input placeholder="author of the news" name="newsAuthor" onChange={read_input}></input>
     <input placeholder="yyyy-mm-dd"  name="dateOfTheNews" onChange={read_input}></input>
     <button onClick={send_data}>Create News</button>
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