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
//   if(data && !data.success){
//     setErrors([{message:'All required(*) fields must be completed'}])
//   }
}

return(
    <>
    <h2 className="centerCenter">Create your news</h2>
    <div className="addGameContainer centerCenter">
        
        <form className="addNews">
            <input type="text" placeholder="Title of the news" name="newsTitle" onChange={read_input}/>
            <label htmlFor='newsImg'><p>Image for the news</p></label>
            <label htmlFor="uploadButton" className="inputFile" htmlFor="newsImg">
                <p>Click here to Upload a news image</p>
                <input id="uploadButton" type='file' name='newsImg' onChange={read_input}/>
            </label>            
            <input type="text" placeholder="Description of the news" name="newsDescription" onChange={read_input}/>
            <textarea type="text" placeholder="Body of the news" name="newsBody" style={{resize: "unset", height:"150px" }} onChange={read_input}/>
            <input type="text" placeholder="Author of the news" name="newsAuthor" onChange={read_input}/>
            <button onClick={send_data} >Create News</button>
            {errors&& errors.map((error,index) =>{
                                    return (<p key={index}>{error.message}</p>)
                                })}
        </form>
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