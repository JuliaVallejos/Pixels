import { useState } from "react"
import { connect } from "react-redux"
import newsActions from "../redux/actions/newsActions"


const AddNew = (props)=>{
    const [errors,setErrors] = useState([])
    const [news, setNews]=useState({})

const read_input = e=>{
    const property= e.target.name
    var value = e.target.value
    if(property==="newsImg"){
        value=e.target.files[0];
    }
    setNews({
        ...news,
        [property]:value
    })
}


const send_data = async e=>{
    setErrors([])
    e.preventDefault()
    const {newsTitle,newsImg,newsDescription,newsBody,newsAuthor,dateOfTheNews} = news
    const formNews= new FormData();

    formNews.append("newsTitle", newsTitle)
    formNews.append("newsImg", newsImg)
    formNews.append("newsDescription", newsDescription)
    formNews.append("newsBody", newsBody)
    formNews.append("newsAuthor", newsAuthor)


  if(newsTitle ==='' || newsImg === '' || newsDescription === '' || newsBody === '' || newsAuthor === ''  ){
     setErrors([{message:'All required(*) fields must be completed'}])
      return false 
  }

  const data = await props.createNews(formNews)
  console.log(data)
  if(data && data.success){
    alert("news created")
    window.location='/news'
  }
  else{
      alert("error to create news")
  }
}

console.log(props.news)
return(
    <>
    <h2>create your news</h2>
    <div className="developersAdd centerCenter" style={{height: "65vh"}}>
        
        {/* <form> */}
            <input type="text" placeholder="title of the news" name="newsTitle" onChange={read_input}/>
            <label htmlFor='newsImg'><p>Image of the news</p></label>
            <input type='file' id='newsImg' name='newsImg' onChange={read_input}/>
            <input type="text" placeholder="description of the news" name="newsDescription" onChange={read_input}/>
            <textarea type="text" placeholder="body of the news" name="newsBody" style={{resize: "unset", height:"150px" }} onChange={read_input}/>
            <input type="text" placeholder="author of the news" name="newsAuthor" onChange={read_input}/>
            <button onClick={send_data} >Create News</button>
            {errors&& errors.map((error,index) =>{
                                    return (<p key={index}>{error.message}</p>)
                                })}
        {/* </form> */}
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



 export default connect(mapStateToProps,mapDispatchToProps)(AddNew)