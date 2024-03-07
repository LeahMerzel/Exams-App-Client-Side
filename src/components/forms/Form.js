import React, { useState } from "react";
import { Button, Form as BootstrapForm, Container, Form } from "react-bootstrap";

const FormField = ({ label, type, value, onChange, options }) => {

  // const FormField = ({ label, type, value, onChange, options, regex }) => {
  //   const [error, setError] = useState(null);
  
  //   const handleInputChange = (e) => {
  //     const inputValue = e.target.value;
  //     if (regex && inputValue && !regex.test(inputValue)) {
  //       setError(`Invalid ${label}`);
  //     } else {
  //       setError(null);
  //     }
  //     onChange(inputValue);
  //   };



  return (
    <div>
      <BootstrapForm.Label>{label}</BootstrapForm.Label>
      {type === "file" ? (
        <input type={type} onChange={(e) => onChange(e.target.files[0])} />
      ) : type === "select" ? (
        <Form.Select value={value} onChange={onChange}>
          
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      ) : (
        <BootstrapForm.Control type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
};


const FormComponent = ({ fields, onSubmit, entityName, onRender }) => {
  const [formData, setFormData] = useState({});
  const [formVisible, setFormVisible] = useState(false);

  const handleChange = (e, fieldName) => {
    const updatedFormData = { ...formData, [fieldName]: e.target.value };
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    setFormVisible(false);
  };

  const handleCancel = () => {
    setFormData({});
    setFormVisible(false);
  };

  const handleCreateNew = () => {
    setFormVisible(true);
  };

  if (!formVisible && entityName !== "Login" && entityName !== "Register" && entityName !== "Update") {
    return (
      <Button onClick={handleCreateNew}>Create New {entityName}</Button>
    );
  }

  return (
    <>
      <Container className="d-flex align-items-center mt-3 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <h3 className="pb-3">{entityName}</h3>
          {fields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              type={field.type} 
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field.name)}
              options={field.options}
              //              regex={field.regex} // Pass the regex pattern to FormField

            />
          ))}
          <br />
          <Button type="submit" >
            {entityName === "Login" || entityName === "Register" || entityName === "Update"
              ? ""
              : "Submit"}{" "}
            {entityName}
          </Button>
          {entityName !== "Login" && entityName !== "Register" && (
            <Button onClick={handleCancel} className="ms-2">
              Cancel
            </Button>
          )}
        </BootstrapForm>
        {typeof onRender === "function" && onRender()}
      </Container>
    </>
  );
};

export default FormComponent;