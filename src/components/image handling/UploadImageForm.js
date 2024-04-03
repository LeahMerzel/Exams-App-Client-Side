import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const UploadImageForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  useEffect(()=> {
    console.log(file)
  },[file])

  const handleUploadImage = async () => {
    onUpload(file);
    setFile(null);
  };
  // const handleUpload = async () => {
  //   if (!file) {
  //     alert('Please select a file.');
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append('imageFile', selectedFile);

  //     const response = await fetch(`https://localhost:7252/api/Question/${questionId}/image`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const imageUrl = await response.text(); // Assuming the backend sends back the URL of the uploaded image
  //       setImageUrl(imageUrl); // Set the URL of the uploaded image
  //       alert('Image uploaded successfully.');
  //     } else {
  //       const errorMessage = await response.text();
  //       alert(`Failed to upload image: ${errorMessage}`);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     alert('An error occurred while uploading the image.');
  //   }

  return (
    <div>
    <input type="file" onChange={handleChange} />
    {file && (
      <>
    <img src={file} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
    <Button onClick={handleUploadImage}>Upload Image</Button>
      </>
  )}
</div>
  );
};

export default UploadImageForm;
