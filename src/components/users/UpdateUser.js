import React, { useState} from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";

const UpdateUser = ({item}) => {
    const updateUserApiUrl = "https://localhost:7252/api/Auth/update";
    const { updateEntity, isLoading, error } = useUpdate(updateUserApiUrl);
    const [imageFile, setImageFile] = useState(null); 

    const fields = [
        { name: "userName", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "phoneNumber", label: "Phone Number", type: "text" },
        { name: "image", label: "Upload Image", type: "file" } 
    ];


    const onSubmit = async (formData) => {
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });
        formDataWithImage.append("image", imageFile);

        console.log("Form data with image:", formDataWithImage);
        await updateEntity(item.id, formDataWithImage);
        setImageFile(null);
    };


    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={item.userRole}/>
        </div>
    );
};
  
export default UpdateUser;
