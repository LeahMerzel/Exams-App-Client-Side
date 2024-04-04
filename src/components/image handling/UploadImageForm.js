import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UploadImageForm = ({ questionId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); 
  const [showForm, setShowForm] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a temporary URL for the selected image file
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

const handleUpload = async () => {
  if (!selectedFile) {
    alert('Please select a file.');
    return;
  }

  // Check if the selected file is an image
  if (!selectedFile.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('imageFile', selectedFile);

    const response = await fetch(`https://localhost:7252/api/Question/${questionId}/image`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setShowForm(false);
      const imageUrl = await response.text(); // Assuming the backend sends back the URL of the uploaded image
      setImageUrl(imageUrl); // Set the URL of the uploaded image
      alert('Image uploaded successfully.');
    } else {
      const errorMessage = await response.text();
      alert(`Failed to upload image: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('An error occurred while uploading the image.');
  }
};

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && showForm &&( // Display the selected image if imageUrl is not null
        <div>
          <h3>Selected Image:</h3>
          <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
      <Button onClick={handleUpload}>Upload Image</Button>
    </div>
  );
};

export default UploadImageForm;
