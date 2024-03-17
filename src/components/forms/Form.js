import React, { useState, useEffect } from "react";
import { Button, Form as BootstrapForm, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import FormField from "./FormField";

const FormComponent = ({ fields, onSubmit, entityName, onRender, newPageUrl }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (fieldName) => (value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    setFormData(updatedFormData);
  };
        
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  const handleCancel = () => {
    setFormData({});
  };

  useEffect(() => {
    if ( (entityName !== "Login" && entityName !== "Register" && entityName !== "Update")) {
      navigate(newPageUrl);
    }
  }, [ entityName, newPageUrl]);

  return (
    <>
      <Container className="mt-3 p-3">
          <BootstrapForm onSubmit={handleSubmit}>
            <h3 className="pb-3">{entityName}</h3>
            {fields.map((field) => (
              <div key={field.name} className="mb-4">
                <FormField
                  label={field.label}
                  type={field.type} 
                  value={formData[field.name] || ""}
                  onChange={handleChange(field.name)}
                  options={field.options}
                  className="w-100 w-md-75" 
                />
              </div>
            ))}
            <Button type="submit" className="me-2">
              {entityName === "Login" || entityName === "Register" || entityName === "Update"
                ? ""
                : "Submit"}{" "}
              {entityName}
            </Button>
            {entityName !== "Login" && entityName !== "Register" && (
              <Button onClick={handleCancel}>
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
