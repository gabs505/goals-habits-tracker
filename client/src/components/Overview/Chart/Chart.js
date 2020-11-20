import React from 'react'
import { Bar } from 'react-chartjs-2';
import {connect} from 'react-redux'
import classes from './Chart.module.css'

const data={
    labels: [],
    datasets: [{
        label: '# of succeeded days',
        data: [],
        backgroundColor:'#B7F2D2',
        
        borderColor:'rgba(54, 162, 235, 1)',
            
        borderWidth: 1
    },
    {
      label: '# of failed days',
      data: [],
      backgroundColor:'#FF7070',
      
      borderColor: 'rgba(255, 99, 132, 1)',
      
      borderWidth: 1
  }]
}

const options= {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

const getNumOfDoneDays=(goals)=>{
    return goals.map(goal=>goal.progress.reduce((sum,day)=>{
        return day==='d' ? sum+1 : sum;
    },0))
}

const getNumOfFailedDays=(goals)=>{
    return goals.map(goal=>goal.progress.reduce((sum,day)=>{
        return day!=='d' ? sum+1 : sum;
    },0))
}

const chart = props =>{
    if(props.goals){
        console.log(getNumOfDoneDays(props.goals))
        data.datasets[0].data=getNumOfDoneDays(props.goals)
        data.datasets[1].data=getNumOfFailedDays(props.goals)
        data.labels=props.goals.map(goal=>goal.name)
    }
    
    return(
        <div className={classes.Chart}>
            <h2>{props.title}</h2>
            <Bar data={data} options={options}
     />
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        goals:state.goal.goals
    }
}

export default connect(mapStateToProps)(chart);