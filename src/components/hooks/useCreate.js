import { useState } from 'react';
import { createEntityAPI } from '../api/CrudApi';
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
        throw new Error('Failed to create entity');
      }

      return await response.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { createEntity, isLoading, error };
};

export default useCreate;
