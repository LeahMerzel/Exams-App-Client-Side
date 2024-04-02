import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// useCreate hook
const useCreate = (apiUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEntity = async (requestBody) => {
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        toast.error("failed to create")
        throw new Error('Failed to create');
      }
      toast.success("created successfully")
      return await response.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { createEntity, isLoading, error };
};

export default useCreate;
