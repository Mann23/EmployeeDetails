import React from 'react';
import EmployeeTable from './components/EmployeeTable';
import Form from './components/Form';
import Message from './components/Message';
import EmployeeAPI from './EmployeeAPI';


class App extends React.Component{
   constructor(props){
      super(props);
      this.state={
         employees:[],
         isEditForm:false,
         employee:{
            firstName:"",
            lastName:"",
            salary:"",
            job:""
         },
         message:{}
      };

      //bindings are all the functions we need to pass to child component
       this.deleteHandler = this.deleteHandler.bind(this);
       this.addHandler = this.addHandler.bind(this);
       this.updateHandler = this.updateHandler.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.showEditForm = this.showEditForm.bind(this);
   }

   componentDidMount(){
      EmployeeAPI.getEmployees().then(data=>{this.setState({employees:data.response})});
   }

   resetForm(){
      this.setState({
         employee:{
            firstName:"",
            lastName:"",
            salary:"",
            job:""
         }
      });
   }

   handleChange(e)
   {
      this.setState({
         employee : {
            ...this.state.employee,
            [e.target.name] : e.target.value
         }
      });
   }

   showEditForm(employee){
      this.setState({isEditForm:true,employee:employee});
   }

   async deleteHandler(id){
      const deleteData = await EmployeeAPI.deleteEmployee(id);
      //const message = deleteData.message;
      if(deleteData.msgError){
         this.setState({message:deleteData});
      }
      else{
         const data=await EmployeeAPI.getEmployees();
         this.setState({message:deleteData,employees:data.response})
      }
   }

   async updateHandler(e){
      e.preventDefault();
      const updateData = await EmployeeAPI.updateEmployee(this.state.employee);
      //const message = updateData.message;
      if(updateData.msgError){
         this.setState({message:updateData});
      }
      else{
         const data=await EmployeeAPI.getEmployees();
         this.setState({message:updateData,employees:data.response})
      }

      this.setState({isEditForm:false});
      this.resetForm();
   }

   async addHandler(e){
      e.preventDefault();
      const postData = await EmployeeAPI.createEmployee(this.state.employee);
      //const message = postData.message;
      if(postData.msgError){
         this.setState({message:postData});
      }
     else{
         const data=await EmployeeAPI.getEmployees();
         this.setState({message:postData,employees:data.response})
     }
      this.resetForm();
   }


   renderEmployeeTable(){
      if(this.state.employees.length > 0)
      {
         return(
            <EmployeeTable employees={this.state.employees} deleteHandler={this.state.deleteHandler} showEditForm={this.state.showEditForm} />
         );
      }

      return null;//null means that no component will be rendered
   }

   renderForm()
   {
      return(
         <Form isEditForm={this.state.isEditForm} employee={this.state.employee} handleChange={this.state.handleChange} handler={!this.state.isEditForm?this.addHandler:this.updateHandler}/> 
      );
   }

   renderMessage(){
      if(this.state.message === null)
      return null;

      return(<Message message={this.state.message} />);
   }
   render(){
      return(
         <div className="row">
            <div className="col"></div>
            <div className="col-10">
               {this.renderEmployeeTable()}
               {this.renderForm()}
               {this.renderMessage()}
            </div>
            <div className="col"></div>
         </div>
      )
   }
}

export default App;