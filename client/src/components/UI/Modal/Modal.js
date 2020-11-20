import React from 'react'
import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const modal=(props)=>(
<Auxiliary>
    <Backdrop clicked={props.backdropClicked}/>
    <div className={classes.Modal}>
        {props.children}  
    </div>
</Auxiliary>

)

export default modal;