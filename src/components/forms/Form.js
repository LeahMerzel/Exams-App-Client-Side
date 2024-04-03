import React, { useState, useEffect } from "react";
import { Button, Form as BootstrapForm, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import FormField from "./FormField";
import UploadImageForm from "../image handling/UploadImageForm";

const FormComponent = ({ fields, onSubmit, entityName, onRender, newPageUrl, onRenderImage }) => {
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [addImage, setAddImage] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (fieldName) => (value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    setFormData(updatedFormData);
  
    // Validate the form data whenever there's a change
    validateFormData(updatedFormData);
  };
  
  const handleCancel = () => {
    setFormData({});
    setFieldErrors({});
  };
        
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const isValid = validateFormData(formData);

    if (!isValid) {
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({});
    } catch (error) {
      console.error('Submission failed:', error.message);
    }
  };

  const validateFormData = (formData) => {
    const errors = {};

    for (const field of fields) {
      const { name, required, regex } = field;
      // Check for required fields
      if (required && !formData[name]) {
        errors[name] = `${field.label} is required`;
      }
      // Check for regex validation
      if (regex && formData[name] && !regex.test(formData[name])) {
        errors[name] = `Invalid input for ${field.label}`;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (entityName !== "Login" && entityName !== "Register" && entityName !== "Update") {
      navigate(newPageUrl);
    }
  }, [entityName, newPageUrl]);

  const handleAddImage = () => {
    setAddImage(true);
  }

  const handleUploadImage = (file) => {
    onRenderImage(file);
  };

  return (
    <>
      <Container className="mt-3 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          {entityName !== "this Answer" && <h3 className="pb-3">{entityName}</h3>}
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
            <FormField
              label={field.label}
              type={field.type} 
              value={formData[field.name] || ""}
              onChange={handleChange(field.name)}
              options={field.options}
              className="w-100 w-md-75"
              error={fieldErrors[field.name]}
              hint={field.hint} // Pass down hint prop
            />
            </div>
          ))}
          <Button type="submit" className="me-2" disabled={Object.keys(fieldErrors).length > 0}>
            {entityName === "Login" || entityName === "Register" || entityName === "Update"
              ? ""
              : "Submit"}{" "}
            {entityName}
          </Button>
          {entityName !== "Login" && entityName !== "Register" && entityName !=="this Answer" &&(
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          )}
          {onRenderImage && (
            <>
            <Button onClick={handleAddImage}>Add Image</Button>
            {addImage && <UploadImageForm onUpload={handleUploadImage} />}
            </>
          )}
        </BootstrapForm>
        {typeof onRender === "function" && onRender()}
      </Container>
    </>
  );
};

export default FormComponent;
