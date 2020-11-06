const express=require('express');
const Employee = require('../models/Employee');

const EmployeeRouter = express.Router();

//CRUD

EmployeeRouter.get('/',(req,res)=>{
   Employee.find({},(err,response)=>{   //{} in find means find all
      if(err)
      {
         res.status(500).json({
            msgBody:"Unable to get employee",
            msgError: true
         })
      }
      else
      res.status(200).json({response});
   });
});


EmployeeRouter.post('/',(req,res)=>{
   const employee = new Employee(req.body);
   employee.save((err,document)=>{
      if(err)
      {
         res.status(500).json({
            msgBody:"Unable to add employee",
            msgError: true
         })
      }
      else
      res.status(200).json({
         msgBody:"Success in adding employee",
         msgError: false
      });
   });
});

EmployeeRouter.delete('/:id',(req,res)=>{
   Employee.findByIdAndDelete(req,params.id,err=>{
      if(err)
      {
         res.status(500).json({
            msgBody:"Unable to delete employee",
            msgError: true
         })
      }
      else
      res.status(200).json({
         msgBody:"Success in deleting employee",
         msgError: false
      });
   })
});

EmployeeRouter.put('/:id',(req,res)=>{
   Employee.findOneAndUpdate({_id:req.params.id},req.body,{runValidators:true},(err,response)=>{
      if(err)
      {
         res.status(500).json({
            msgBody:"Unable to update employee",
            msgError: true
         })
      }
      else
      res.status(200).json({
         msgBody:"Success in updating employee",
         msgError: false
      });
   });
});

module.exports=EmployeeRouter;