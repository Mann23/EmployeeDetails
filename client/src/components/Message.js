import React from 'react';

const renderMessageClassName = (props)=>{
   let className="alert text-center "; //here it is different
   if(props.message.msgError){
    className+="alert-danger";
  }
   else
   className+="alert-success";

   return className;
}
const Message = (props)=>{
   return(
      <div className={renderMessageClassName(props)} role="alert">
         {props.message}
      </div>
   )
}

export default Message;