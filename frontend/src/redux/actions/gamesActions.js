const gamesActions = {
    allGames: () =>{
        return async(dispatch,getstate) =>{

            dispatch({type:'ALL_GAMES',payload:''})
        }
    },
    filterGames: search => {
        return async (dispatch,getstate) => {
            dispatch({type:'FILTER',payload:search})
    }
}
}

        export default gamesActions