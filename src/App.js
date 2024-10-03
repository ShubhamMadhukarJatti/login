//import logo from './logo.svg';
import React,{Component} from "react";
import './App.css';

const emailRegex= RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/="?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({fromErrors, ...rest})=>{
  let vaild =true;

  //validate form error being empty
Object.values(fromErrors).forEach(val =>{
  val.length > 0 && (vaild = false);
});

//validate the from was filled out
Object.values(rest).forEach(val=>{
  val === null && (vaild = false);
});
return vaild;
};

class App extends Component{
  constructor(props){
    super(props);

    this.state={
      firstName:null,
      lastName:null,
      email:null,
      password:null,
      fromErrors:{
        firstName:"",
        lastName:" ",
        email:" ",
        password:" "
      }
    };
  }
  handleSubmit = e =>{
    e.preventDefault();

    if(formValid(this.state)){
      console.log(`
      --SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name:${this.state.lastName}
      Email:${this.state.email}
      Password: ${this.state.password}
      `);
    }else{
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  handleChange = e =>{
    e.preventDefault();
    const {name ,value}=e.target;
    let fromErrors={...this.state.fromErrors};

    switch(name){
      case "firstName":
        fromErrors.firstName=
        value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "LastName":
        fromErrors.lastName=
        value.length < 3 ? "Minimum 3 charaters required" :" ";
        break;
      case "email":
        fromErrors.email=emailRegex.test(value)
        ? ""
        : "invalid email address";
        break;
      case "password":
        fromErrors.password=
        value.length < 6 ? "minimum 6 charecaters required":"";
        break;
        default:
          break;
    }
    this.setState({fromErrors,[name]:value}, ()=>
    console.log(this.state));
  };
  render(){
    const {fromErrors}=this.state;

    return(
      <div className="wrapper">
        <div className="from-wrapper">
          <h1>Create Account</h1>
          <from onSubmit ={this.handleSubmit} noValidate>

            <div className="firstName">
              <label htmlFor="firstName">firstName</label>
              <input className={fromErrors.firstName.length > 0 ? "error" : null}
              placeholder="First Name"
              type="text"
              name="FirstName"
              noValidate
              onChange={this.handleChange}/>
              {fromErrors.firstName.length > 0 &&(
                <span className="errorMessage">{fromErrors.firstName}</span>
              )}
         </div>
         <div className="LastName">
              <label htmlFor="LastName">LastName</label>
              <input className={fromErrors.LastName.length > 0 ? "error" : null}
              placeholder="Last Name"
              type="text"
              name="LastName"
              noValidate
              onChange={this.handleChange}/>
              {fromErrors.LastName.length > 0 &&(
                <span className="errorMessage">{fromErrors.LastName}</span>
              )}
              </div>
              <div className="email">
                <label htmlFor="Email">Email</label>
                <input className={fromErrors.email.length > 0 ? "error" : null}
                placeholder="email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}/>
                {fromErrors.email.length > 0 &&(
                  <span className="errorMessage">{fromErrors.email}</span>
                )}
                </div>
                <div className="password">
              <label htmlFor="password">Password</label>
              <input className={fromErrors.password.length > 0 ? "error":null}
              placeholder="Password"
              type="password"
              name="password"
              noValidate
              onChange={this.handleChange}/>
              {fromErrors.password.length > 0 &&(
                <span className="errorMessage">{fromErrors.password}</span>
              )}
              </div>
              <div className="createAccount">
                <button type="submit">Create Account</button>
                <small>Already Have an Account</small>
              </div>
          </from>
        </div>
      </div>
    );
  }
}
export default App;
