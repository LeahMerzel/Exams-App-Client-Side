import React, { useState } from "react";
import { Button, Form as BootstrapForm, Container, Form } from "react-bootstrap";

const FormField = ({ label, type, value, onChange, options }) => {
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

  const handleCancle = () => {
    setFormData({});
    setFormVisible(false);
  };

  const handleCreateNew = () => {
    setFormVisible(true);
  };

  if (!formVisible && entityName !== "Login" && entityName !== "Register") {
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
            />
          ))}
          <br />
          <Button type="submit">
            {entityName === "Login" || entityName === "Register"
              ? ""
              : "Submit"}{" "}
            {entityName}
          </Button>
          <Button onClick={handleCancle} className="ms-2" >Cancle</Button>
        </BootstrapForm>
        {typeof onRender === "function" && onRender()}
      </Container>
    </>
  );
};

export default FormComponent;
