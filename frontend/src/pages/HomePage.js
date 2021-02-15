import CarrouselNews from '../components/CarrouselNews'
import CarrouselGames from '../components/CarrouselGames'

const HomePage = ()=>{
    return(
        <section>
            <div>
                <h1>Textos Sobre la empresa</h1>
            </div>
            <div>
                <CarrouselNews/>
            </div>
            <div>
                <CarrouselGames/>
            </div>
        </section>
    )
}

export default HomePage