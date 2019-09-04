import * as React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../action/auth';

class Login extends React.Component<any, any> {
	constructor(props:any){
		super(props);

		this.state = {
			inputs:{
				username: "",
				password: ""
			},
			errors: {
				username: "",
				password: ""
			},
			redirectToKabinet: false,
			isLoading: false
		}
	}

	validateInput(name: string, value: string) {
		return new Promise((ok:any, error:any):any => {

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

	async submitHandler(event: any) {
		let hasError = false;

		for(let property in this.state.inputs){
			await this.validateInput(property, this.state.inputs[property]);
		}

		for(let property in this.state.errors){
			if(this.state.errors[property] != ""){
				hasError = true;
				break;
			}
		}

		if(!hasError){
			this.setState({
				isLoading:  true
			});

			let response = await this.props.login(
				this.state.inputs.username,
				this.state.inputs.password
			);
			
			this.setState({
				isLoading: false
			});
			if(response.data.status == "error"){
				this.setState({
					errors:{
						username: response.data.message
					}
				});
			} else {
				this.setState({
					redirectToKabinet: true
				});
			}

			// this.props.login(this.state.inputs.username,
			/**	this.state.inputs.password).then((response: any) => {
			 * this.setState({
			 * 	isLoading: true
			 * });
				if(response.data.status == "error")
					this.setState({
						errors: {
							username: response.data.message
						}
					});
				} else {
					this.setState({
						redirectToKabinet: true
					})
				}
				})
			  */
			// axios.post("http://joylar.uz/api/user/login", {
			// 	...this.state.inputs
			// }).then((response) => {
			// 	let data = response.data;
			// 	this.setState({
			// 		isLoading: false
			// 	});

			// 	if(data.status == "error"){
			// 		this.setState({
			// 			errors: {
			// 				username: data.message
			// 			}
			// 		});
			// 	} else {
			// 		localStorage.setItem("token", data.token);
			// 		localStorage.setItem("user", JSON.stringify(data.user));

			// 		this.props.dispatch({
			// 			type:  "CHANGE_AUTH",
			// 			token: data.token,
			// 			user: data.user,
			// 			is_auth: true
			// 		});
			// 		this.setState({
			// 			redirectToKabinet: true
			// 		});
			// 	}
			// });
		} else{
			alert("oshibka bor");
		}
	}
	render () {
		return (
			<div className="wrap">
			{this.state.redirectToKabinet && <Redirect to = "/kabinet"/>}
				<div className="container">
			      <div className="row">
			        <div className="col-5 p-0 mx-auto my-5">
			          <div className="filter"></div>
			          <div className="card">
			            <h5 className="card-header text-primary text-center py-4">
			              <strong className="font-weight-bold text-capitalize"> Login </strong>
			            </h5>
			            <div className="card-body px-lg-5 pt-0">
			              <form className="text-center" onSubmit = {(e:any) => {
											e.preventDefault();

											this.submitHandler(e);
										}}>
			                <div className="md-form">
			                  <input name = "username" type="text" id="materialLoginForm" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.username}/>
			                  <label htmlFor="materialLoginFormUsername">Login</label>
												<p className="text-danger">{this.state.errors.username}</p>
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
												this.state.isLoading ? (
													<i className="fa fa-spinner rotating fa-2x"></i>
												): "Sign in" 
											}
											 </button>
			                <p>Not a member?
			                  <NavLink to = "/registration"> Register</NavLink>
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

export default connect(mapStateToProps, {login})(Login);
