import React, {useState} from 'react'
import {connect} from 'react-redux'
import newsActions from '../redux/actions/newsActions';


const DeveloperPage = (props) =>{
    return(

        <h1>Página del desarrollador</h1>

    )
}

const mapStateToProps= state =>{
    return{
        
    }
}

const mapDispatchToProps= {   
    
}

export default connect(mapStateToProps,mapDispatchToProps)(DeveloperPage)