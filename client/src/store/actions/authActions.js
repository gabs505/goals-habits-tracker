import axios from 'axios'
import {USER_LOADING,USER_LOADED, AUTH_ERROR
,REGISTER_SUCCESS,REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS} from '../actions/actionTypes'
import {returnErrors} from './errorActions'


//Chceck token and load user
export const loadUser=()=>(dispatch,getState)=>{
    //User loading
    dispatch({
        type:USER_LOADING
    })

    // //Get token from local storage
    // const token=getState().auth.token;

    // const config={
    //     headers:{
    //         "Content-type":"application/json"
    //     }
    // }

    // //If token add to headers
    // if(token){
    //     config.headers['x-auth-token']=token;
    // }

    const config=tokenConfig(getState);

    axios.get('auth/user',config)
    .then(res=>{
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
        dispatch({
            type:AUTH_ERROR,

        })
    })
}

//Register user
export const registerUser=({name,email,password})=>dispatch=>{
    const body={
        name,
        email,
        password
    }

    axios.post('http://localhost:5000/users/add',body)
    .then(res=>{
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
        console.log(err)
        dispatch({
            type:REGISTER_FAIL
        })
    })

}


//Login user
export const loginUser=({email,password})=>dispatch=>{
    const body={
        email,
        password
    }

    axios.post('http://localhost:5000/auth/',body)
    .then(res=>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
        console.log(err)
        dispatch({
            type:LOGIN_FAIL
        })
    })

}


//Log out
export const logout=()=>{
    return{
        type:LOGOUT_SUCCESS
    }
}

export const tokenConfig=(getState)=>{
    //Get token from local storage
    const token=getState().auth.token;

    const config={
        headers:{
            "Content-type":"application/json"
        }
    }

    //If token add to headers
    if(token){
        config.headers['x-auth-token']=token;
    }

    return config;
}

