import React from 'react';
import Input from './Input';

const Form = (props)=>{
   return(
      <form onSubmit={props.handler}>
         <h4>{props.isEditForm?"Employee Editing : " : "Add Employee : " }</h4>
         <div className="form-group">    
            <Input name="firstName"
                     placeholder="Enter first name"
                     labelName="First Name: "
                     handleChange={props.handleChange}
                     value={props.isEditForm?props.employee.firstName : null}/>        
            <Input name="lastName"
                     placeholder="Enter last name"
                     labelName="last Name: "
                     handleChange={props.handleChange}
                     value={props.isEditForm?props.employee.firstName : null}/>   
            <Input name="job"
                     placeholder="Enter job"
                     labelName="Job: "
                     handleChange={props.handleChange}
                     value={props.isEditForm?props.employee.firstName : null}/>   
            <Input name="salary"
                     placeholder="Enter salary"
                     labelName="Salary: "
                     handleChange={props.handleChange}
                     value={props.isEditForm?props.employee.firstName : null}/>   
         </div>
         <button type="submit" className="btn btn-primary">Submit</button>
      </form>
   )
}
export default Form;