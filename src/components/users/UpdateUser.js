import React, { useState } from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateUser = ({ userToUpdate }) => {
  const updateUserApiUrl = `https://localhost:7252/api/Auth/update`;
  const { updateEntity, isLoading, error } = useUpdate(updateUserApiUrl);
  const [imageFile, setImageFile] = useState(null);


  const fields = [
    { name: "userName", label: "Username", type: "text", value: userToUpdate.userName },
    { name: "password", label: "New Password", type: "password", value: "" },
    { name: "fullName", label: "Full Name", type: "text", value: userToUpdate.fullName },
    { name: "email", label: "Email Address", type: "email", value: userToUpdate.email },
    { name: "id", type: "hidden", value: userToUpdate.id },
   // { name: "ProfileImagePath", label: "Upload Image", type: "file" }
   // { name: "phoneNumber", label: "Phone Number", type: "text", value: userToUpdate.phoneNumber },
];

  const onSubmit = async (formData) => {
    // const formDataWithImage = new FormData();
    // Object.entries(updatedData).forEach(([key, value]) => {
    //   formDataWithImage.append(key, value);
    // });
    // formDataWithImage.append("image", imageFile);

    try {
       formData.id = userToUpdate.id;
       console.log(formData);
        const response = await updateEntity(formData);
        setImageFile(null);
        if (response ) {
          toast.success('Update successful!');
        }
      } catch (error) {
        console.error('Update failed:', error.message);
        toast.error('Update failed. Please try again.');
      }
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Form fields={fields} onSubmit={onSubmit} entityName={"Update"} />
    </div>
  );
};

export default UpdateUser;

