import React, {Component} from 'react'
import {connect} from 'react-redux'

import TextInput from '../../components/UI/TextInput/TextInput'
import classes from './Login.module.css'
import Button from '../../components/UI/Button/Button'

import {registerUser, loginUser} from '../../store/actions/authActions'


class Login extends Component{
    state={
        isRegisterMenu:false,
        errMsg:null,
        invalidValues:true,

        formFields:[
            {
                name:"Name",
                value:'',
                type:"text",
                valid:false,
                touched:false,
                withLabel:true,
                validationRules:{
                    minLength:true,
                    maxLength:false,
                    specialChAndUppercase:false,
                    mail:false
                },
                validationErrInfo:''
            },
            {
                name:"E-mail",
                value:'',
                type:"email",
                valid:false,
                touched:false,
                withLabel:true,
                validationRules:{
                    minLength:false,
                    maxLength:false,
                    specialChAndUppercase:false,
                    mail:true
                },
                validationErrInfo:''
            },
            {
                name:"Password",
                value:'',
                type:"password",
                valid:false,
                touched:false,
                withLabel:true,
                validationRules:{
                    minLength:true,
                    maxLength:false,
                    specialChAndUppercase:true,
                    mail:false
                },
                validationErrInfo:''
            }
        ],
        
    }


    validateField=(name,value)=>{
        let isValid=false;
        let errorInfo=''
        if(name==="Name"){
            isValid=/[A-za-z]{5,}/.test(value);
            errorInfo=isValid || "Name is too short"
        }
        if(name==="Password"){
            isValid=/.{5,}/.test(value);
            errorInfo=isValid || "Password is too short"
            
        }
        if(name==="E-mail"){
            isValid=/[a-z0-9]{3,}@[a-z0-9]+\.[a-z]+/.test(value);
            errorInfo=isValid || "Invalid e-mail"
            
        }
        

        return [isValid,errorInfo];
    }

    changeInputValueHandler=(idx,event)=>{
        const formFields=[...this.state.formFields];
        const formFieldEl={...formFields[idx]};
        formFieldEl.value=event.target.value;
        formFieldEl.touched=true;
        [formFieldEl.valid,formFieldEl.validationErrInfo]=this.validateField(formFieldEl.name,formFieldEl.value)
        formFields[idx]=formFieldEl;
        this.setState({
            formFields:formFields
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.formFields!==this.state.formFields){
            let invalidValues= !this.state.formFields.find(el=>el.valid===false)?false:true;
            this.setState({
                invalidValues:invalidValues
            })
        }
        
        const {error,isAuthenticated}=this.props;
        if(error !==prevProps.error){
            if(error.id==="REGISTER_FAIL" || error.id==="LOGIN_FAIL"){
                this.setState({errMsg:error.msg.msg})
            }
            else{
                this.setState({errMsg:null})
            }
        }

        if(isAuthenticated){
            this.props.history.push('/goals');
        }
    }

    toggleRegisterLoginHandler=()=>{
        this.setState({
            isRegisterMenu:!this.state.isRegisterMenu,
        })
    }

    

    registerUserHandler=()=>{
        const {formFields}=this.state;
        const newUser={
            name:formFields[0].value,
            email:formFields[1].value,
            password:formFields[2].value
        }

        this.props.registerUser(newUser);
    }

    loginUserHandler=()=>{
        const {formFields}=this.state;
        const user={
            email:formFields[1].value,
            password:formFields[2].value
        }
        this.props.loginUser(user);
    }

    render(){
        const {isRegisterMenu} = this.state;
        

        const formElements= isRegisterMenu ? 
        this.state.formFields.map((el,idx)=><TextInput {...el} key={idx} id={idx} changed={this.changeInputValueHandler}/>):
        this.state.formFields.map((el,idx)=>{
            if(el.name!="Name") 
                return <TextInput {...el} key={idx} id={idx} changed={this.changeInputValueHandler} />
        })

        const errorBox=this.state.errMsg ? (<div className={classes.Error}>{this.state.errMsg}</div>):null;

        return(
            <div className={classes.Login}>
                
                <h1>{isRegisterMenu ? "Register":"Log In"}</h1>
                <form className={classes.Form}>
                    {errorBox}
                    {formElements}
                    {/* <div>
                        <label className={classes.Label} htmlFor="email">Email:</label>
                        <TextInput changed={this.changeInputValueHandler} type="email" id="email"></TextInput>
                    </div>
                    <div>
                        <label className={classes.Label} htmlFor="password">Password:</label>
                        <TextInput type="password" id="password" changed={this.changeInputValueHandler}></TextInput>
                    </div> */}
                    <Button clicked={isRegisterMenu ? this.registerUserHandler : this.loginUserHandler}>Submit</Button>
                    <Button clicked={this.toggleRegisterLoginHandler} 
                    btnType={isRegisterMenu?"Success":"Danger"} 
                    >{isRegisterMenu?"Log In":"Register"}</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        registerUser:(user)=>dispatch(registerUser(user)),
        loginUser:(user)=>dispatch(loginUser(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);