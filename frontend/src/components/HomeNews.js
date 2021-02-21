const HomeNews = ({news:{newsImg,newsTitle,news,newsDescription}}) =>{
    
    return (
        <>
            <div className="bordes estiloCardIt estiloCard cardHijo justifyFlexEnd homeNewsCards" 
                style={{ backgroundImage: `url("/newsImages/${newsImg}")` }}>
                <div className="news ">
                    <div className="texto">
                        <h3 className="tituloNoticia">{newsTitle}</h3>
                        <h2 className="descripcionNoticia">{newsDescription}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeNews

