import * as React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategoryList, postCategoryList} from '../action/category';
import { LogOutList } from '../action/category';

 class Kabinet extends React.Component <any, any>{
    constructor(props: any){
        super(props);
        
        this.state = {
          inputs: {
            title_uz: "",
            title_ru: "",
            title_en: ""
          },

          errors: {
            title_uz: "",
            title_ru: "",
            title_en: ""
          },

          category : [],
          isLoading: true,
          isLoadingSubmit: false            
         };
        
         this.init();
        //  Axios.get("http://joylar.uz/api/category").then((res:any) => {
        //   this.setState({
        //     category: res.data,
        //     isLoading: false
        //   });
        // });
    }

    async init(){
      let category = await this.props.getCategoryList();

      this.setState({
        category,
        isLoading: false
      });
    }

    logoutHandler(event: any){
      // this.props.dispatch({
      //   type: "LOGOUT"
      // });

      this.props.LogOutList();
    }

    validateInput(name: string, value:string){

      return new Promise((ok: any, error: any) => {
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

    changeHandler (e:any){
      let name = e.target.name;
      let value = e.target.value;

      this.validateInput(name, value).then(() =>{
        this.setState({
          inputs: {
            ...this.state.inputs,
            [name]: value
          }
        });
      });
    }

    async submitHandler(e:any){
      let hasError = false;

      for(let property in this.state.inputs){
        await this.validateInput(property, this.state.inputs[property]);
      }

      for(let property in this.state.errors){
        if(this.state.errors[property] != ""){
          hasError=true;
          break;
        }
      }

      if(!hasError){
        this.setState({
          isLoadingSubmit: true
        });

        // Axios.post("http://joylar.uz/api/category/create", {
        //   ...this.state.inputs
        // })
        this.props.postCategoryList(this.state.inputs.title_uz, this.state.inputs.title_ru, this.state.inputs.title_en).then((response: any)=>{
          let data = response.data;
            
          this.setState({
            isLoadingSubmit: false,
           
            category: [
              ...this.state.category,
              {
                id: data.inserted_id,
                name_uz: this.state.inputs.title_uz,
                name_ru: this.state.inputs.title_ru,
                name_en: this.state.inputs.title_en

              },
            ],
            inputs:{
                title_uz: "",
                title_ru: "",
                title_en: ""
              }
          });
         
          
        });
      } else{
        alert("Oshibka bor");
      }
      
      
    }

    render(){
        let first = this.props.user ? this.props.user.first : "";
        let last = this.props.user ? this.props.user.last : "";
        return(
            <div>
                {!this.props.is_auth && (<Redirect to = "/login"/>)}

        <nav className="mb-1 navbar navbar-expand-lg navbar-dark info-color">
           <NavLink className="navbar-brand" to = "/">Navbar</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {this.props.is_auth ? <a href="#" className = "nav-link">Welcome</a>: (<NavLink className = "nav-link" to = "/login"> Login</NavLink> ) }
          </li>
          
            
          <li className="nav-item ">
            <a className="nav-link " id="navbarMenuLink-4"
              aria-haspopup="true" aria-expanded="false" onClick = {(event:any) => {
                this.logoutHandler(event);
              }}>
              <i className="fa fa-user " ></i> Logout ({first + " " + last}) </a>
            
          </li>
        </ul>
      </div>
    </nav>
    
   
              <section>
                
                <div className="wrap">
                <div className="container">
                  <div className="row">
                    <div className="col-5 p-0 mx-auto my-5">
			          <div className="filter"></div>
			          <div className="card">
			            
			            <div className="card-body px-lg-5 pt-0">
			              <form className="text-center" onSubmit = {(e:any) => {
											e.preventDefault();

                      this.submitHandler(e);
                      
                      
										}}>
			                <div className="md-form">
			                  <input name = "title_uz" type="text" id="materialLoginForm" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.title_uz}/>
			                  <label htmlFor="materialLoginFormUsername">Title_uz</label>
												<p className="text-danger"> {this.state.errors.title_uz}</p>
			                </div>
			                <div className="md-form">
			                  <input name = "title_ru" type="text" id="materialLoginFormPassword" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.title_ru}/>
			                  <label htmlFor="materialLoginFormPassword">Title_ru</label>
												<p className="text-danger"> {this.state.errors.title_ru}</p>
			                </div>

                      <div className="md-form">
			                  <input name = "title_en" type="text" id="materialLoginFormPassword" className="form-control" onChange = {(e:any) => this.changeHandler(e)} value = {this.state.inputs.title_en}/>
			                  <label htmlFor="materialLoginFormPassword">Title_en</label>
												<p className="text-danger"> {this.state.errors.title_en}</p>
			                </div>
			                
			                <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 font-weight-bold" type="submit">
											{
												this.state.isLoadingSubmit ? (
													<i className="fa fa-spinner rotating fa-2x"></i>
												): "Sign in" 
											}
											 </button>
			              </form>
			            </div>
			          </div>
                </div>
                </div>                
                  
                </div>
                </div>
                

                <div className="container">
                <div className="row">
                <ul>
                  {this.state.isLoading ? (
                    <i className="fa fa-spinner fa-2x rotating"></i> 
                    
                  ) : this.state.category.map((element: any, index: number) => {
                    return (
                            <li style = {{color: "red"}} key = {index}>{element.id + " " + element.name_uz + " " + element.name_ru + " " + element.name_en }</li>
          
                    )
                  
                }) }
                  </ul>
                </div>
               </div>
              </section>
            </div>
        )
    }
}

function mapStateToProps(state:any){
    return state;
}

export default connect(mapStateToProps, {getCategoryList, LogOutList, postCategoryList})(Kabinet);