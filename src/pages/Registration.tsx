import * as React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { SignUp } from '../action/registr';

class Registration extends React.Component<any, any> {
	constructor(props:any){
		super(props);

		this.state = {
			inputs: {
				username: "",
				password: "",
				first_name: "",
				last_name:  "",
				email: ""
			},
			errors: {
				username: "",
				password: "",
				first_name: "",
				last_name:  "",
				email: ""
			},
			redirectToLogin: false,
			isLoading: false
		}}

		validateInput(name: string, value: string){

			return new Promise<any> ((ok:any, error: any):any => {
				this.setState({
					errors: {
						...this.state.errors,
						[name]: value == "" ? (name + "required") : ""
					}
				}, () => {
					ok();
				});
			});
		}

		changeHandler(event: any){
			let name = event.target.name;
			let value = event.target.value;

			this.validateInput(name, value).then(() => {
				this.setState({
					inputs: {
						...this.state.inputs,
						[name]: value
					}
				});
			});
		}
		async submitHandler(event:any){
			let hasError = false;

			for(let property in this.state.inputs){
				await this.validateInput(property, this.state.inputs[property]);
			}
			
			for (let property in this.state.errors) {
				if (this.state.errors[property] != "") {
					hasError = true;
					break;
					
				}
			}

			if(!hasError){
				this.setState({
					isLoading: true
				})
				// axios.post("http://joylar.uz/api/user/signup", {
				// 	...this.state.inputs,
				// 	first: this.state.inputs.first_name,
				// 	last: this.state.inputs.last_name
				// })
				this.props.SignUp(this.state.inputs.username, this.state.inputs.password,
					 this.state.inputs.first_name, this.state.inputs.last_name, this.state.inputs.email).then((response: any) => {
					let data = response.data;

					this.setState({
						isLoading: false
					})

					if(data.status == "error"){
						for(let property in data.errors){
							if(property == "first"){
								this.setState({
									errors: {
										...this.state.errors,
										first_name: data.errors[property].join(", ")
									}
								});
							} else if(property == "last"){
								this.setState({
									errors: {
										...this.state.errors,
										last_name: data.errors[property].join(", ")
									}
								});
							} else {
								this.setState({
									errors: {
										...this.state.errors, 
										[property]: data.errors[property].join(", ")
									}
								});
							}
						}
					} else {
						this.setState({
							redirectToLogin: true
						});
					}
				});
			} else {
				alert('oshibka bor');
			}
			
		}
	render () {
		return (
			<div className="wrap">
			{this.state.redirectToLogin && <Redirect to = "/login"/>}
				<div className="container">
			      <div className="row">
			        <div className="col-5 p-0 mx-auto my-5">
			          <div className="filter"></div>
			          <div className="card">
			            <h5 className="card-header text-primary text-center py-4">
			              <strong className="font-weight-bold text-capitalize"> Sign in </strong>
			            </h5>
			            <div className="card-body px-lg-5 pt-0">
			              <form className="text-center" onSubmit = {(e:any) => {
											e.preventDefault();
											
											this.submitHandler(e);
										}}>
										
											<div className="md-form">
			                  <input name = "first_name" type="text" id="materialLoginFormEmail1" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.first_name}/>
			                  <label htmlFor="materialLoginFormEmail">Fisrt name</label>
												<p className="text-danger">{this.state.errors.first_name}</p>
			                </div>
			                <div className="md-form">
			                  <input name = "last_name" type="text" id="materialLoginFormPassword1" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.last_name}/>
			                  <label htmlFor="materialLoginFormPassword1">Last name</label>
												<p className="text-danger">{this.state.errors.last_name}</p>
			                </div>
			                <div className="md-form">
			                  <input name = "username" type="text" id="materialLoginForm1" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.username}/>
			                  <label htmlFor="materialLoginForm">Login</label>
												<p className="text-danger">{this.state.errors.username}</p>
			                </div>
			                
											<div className="md-form">
			                  <input name = "email" type="email" id="materialLoginFormEmail" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.email}/>
			                  <label htmlFor="materialLoginFormEmail1">E-mail</label>
												<p className="text-danger">{this.state.errors.email}</p>
			                </div>
			                <div className="md-form">
			                  <input name = "password" type="password" id="materialLoginFormPassword" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.password}/>
			                  <label htmlFor="materialLoginFormPassword">Password</label>
												<p className="text-danger">{this.state.errors.password}</p>
			                </div>
			                <div className="d-flex justify-content-around">
			                  <div>
			                    <div className="form-check">
			                      <input type="checkbox" className="form-check-input" id="materialLoginFormRemember" />
			                      <label className="form-check-label" htmlFor="materialLoginFormRemember">Remember me</label>
			                    </div>
			                  </div>
			                  <div>
			                    <a href="">Forgot password?</a>
			                  </div>
			                </div>
			                <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 font-weight-bold" type="submit"> 
											{
												this.state.isLoading ?(
													<i className="fa fa-spinner fa-2x rotating"></i>
												):"Sign in"
											}
											 </button>
			                <p>Not a member?
			                  <a href="">Register</a>
			                </p>
			                <p>or sign in with:</p>
			                <a type="button" className="btn-floating btn-fb btn-sm">
			                  <i className="fa fa-facebook"></i>
			                </a>
			                <a type="button" className="btn-floating btn-tw btn-sm">
			                  <i className="fa fa-twitter"></i>
			                </a>
			                <a type="button" className="btn-floating btn-li btn-sm">
			                  <i className="fa fa-linkedin"></i>
			                </a>
			                <a type="button" className="btn-floating btn-git btn-sm">
			                  <i className="fa fa-github"></i>
			                </a>
			              </form>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		)
	}
}

function mapStateToProps(state: any){
	return state;
}

export default connect(mapStateToProps, {SignUp})(Registration)