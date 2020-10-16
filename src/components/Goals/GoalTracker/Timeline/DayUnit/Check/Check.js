import React from 'react'

import Tick from '../../../../../../assests/images/tick.png'
import Ex from '../../../../../../assests/images/eks.png'

const check=(props)=>(
    <img src={props.tick ? Tick : Ex} style={{height:"70%", maxHeight:"60px"}}
    onClick={props.changed}></img>
)

export default check;