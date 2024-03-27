import React from "react";
import { Form as BootstrapForm } from "react-bootstrap";

const FormField = ({ label, type, value, onChange, options }) => {
    const handleChange = (e) => {
      let newValue;
      if (type === "checkbox") {
        newValue = e.target.checked;
      } else if (type === "file") {
        newValue = e.target.files[0];
      } else {
        newValue = e.target.value;
      }
      onChange(newValue);
    };
    
    return (
      <div>
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        {type === "file" ? (
          <input type={type} onChange={handleChange} />
        ) : type === "select" ? (
          <BootstrapForm.Select value={value} onChange={handleChange}>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </BootstrapForm.Select>
        ) : type === "checkbox" ? (
          <BootstrapForm.Check
            type={type}
            checked={value} 
            onChange={handleChange} 
            label={label}
          />
        ) : (
          <BootstrapForm.Control type={type} value={value} onChange={handleChange} />
        )}
      </div>
    );
  };
  
  export default FormField;
  