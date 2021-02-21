import {Link} from "react-router-dom"
const HomeNews = ({news:{_id,newsImg,newsTitle,newsDescription}}) =>{
    
    return (
        <>
        <Link to= {`/news/${_id}`}>
            <div className="bordes estiloCardIt estiloCard cardHijo justifyFlexEnd homeNewsCards" 
                style={{ backgroundImage: `url("/newsImages/${newsImg}")` }}>
                <div className="news">
                    <div className="texto">
                        <h3 className="tituloNoticia">{newsTitle}</h3>
                        <h2 className="descripcionNoticia">{newsDescription}</h2>
                    </div>
                </div>
            </div>
        </Link>
        </>
    )
}
export default HomeNews

