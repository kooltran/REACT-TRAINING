import React, { Component } from 'react';

const FormErrors = ({formErrors}) =>
  <div className='form-error'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>

  export default FormErrors;