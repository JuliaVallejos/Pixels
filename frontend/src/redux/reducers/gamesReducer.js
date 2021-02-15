const initialState ={
    gamesList:[
        {
        _id:'sfafas1132532dgds',
        gameTitle:'Game 1',
        gameImg:'img1',
        gameInfo:'Un juego llamado game 1',
        gameCategory:['Action','Rpg'],
        idUser:'dafsafsa131311',
        valoration:['asfasfa','1231rtww3223','fafas554'],
        clasificationPEGI:'3',
        userComments:[{
            idUser:'fsasf344',
            comment:'Lindo juego'},
            {idUser:'asfs889',
            comment:'no me gusto'
        }]},
        {
        _id:'fa446hhfh',
        gameTitle:'Game 2',
        gameImg:'img2',
        gameInfo:'Un juego llamado game 2',
        gameCategory:['Adventure','Rpg','shooter'],
        idUser:'dafsafsa131311',
        valoration:['asfasfa','1231rtww3223','fafas554'],
        clasificationPEGI:'12',
        userComments:[{
            idUser:'fsasf32544',
            comment:'Lindo juego'},
            {idUser:'asf23589',
            comment:'no me gusto'
        }]},
        {
        _id:'faf5sasafsa6',
        gameTitle:'Game 3',
        gameImg:'img3',
        gameInfo:'Un juego llamado game 3',
        gameCategory:['Survival','Moba'],
        idUser:'dafsafsa131311',
        valoration:['asfasfa','1231rtww3223','fafas554'],
        clasificationPEGI:'16',
        userComments:[{
            idUser:'fsasf32544',
            comment:'Lindo juego'},
            {idUser:'asf23589',
            comment:'no me gusto'
        }]}
    ]

}
 function gamesReducer(state= initialState,action){
    switch (action.type) {
        case 'ALL_GAMES':
        return{
            ...state,
            newGamesList:state.gamesList
        }
        
        case 'FILTER':
         
        return {
            ...state,
            newGamesList: state.gamesList.filter(({gameTitle}) => gameTitle.toUpperCase().indexOf(action.payload.toUpperCase().trim())=== 0)
        
        }
        
        default:
            return state


}}

export default gamesReducer
