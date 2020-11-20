import React from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { Bar } from 'react-chartjs-2';
import Chart from './Chart/Chart'

const overview=props=>{
    return(
        <div style={{display:"flex", flexDirection:'column', justifyContent:"center"}}>
         <Chart title="Your progress chart"/>
            
        </div>
    )
}

export default overview;