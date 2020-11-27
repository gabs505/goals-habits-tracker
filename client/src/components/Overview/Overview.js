import React from 'react'
import Chart from './Chart/Chart'
import {connect} from 'react-redux'

const overview=props=>{
    return props.isAuthenticated?
            (<div style={{display:"flex", flexDirection:'column', justifyContent:"center"}}>
            <Chart title="Your progress chart"/>
               
           </div>):<h1>Please log in</h1>
        
    
}


const mapStateToProps=state=>{
    return{
        isAuthenticated: state.auth.isAuthenticated,
    }
}


export default connect(mapStateToProps)(overview);
