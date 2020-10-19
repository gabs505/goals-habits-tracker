import React from 'react'

import Tick from '../../../../../../assests/images/tick.png'
import Ex from '../../../../../../assests/images/eks.png'

const check=(props)=>{
    return props.tick==='' ? null : <img src={props.tick ? Tick : Ex} style={{ height:"40px"}}
        onClick={props.changed}></img>
    
    
    
}

export default check;