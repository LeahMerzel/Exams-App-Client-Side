import { useState } from 'react';
import { createEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCreate = (apiUrl, token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEntity = async (entityData) => {
    setIsLoading(true);
    setError(null);

    try {
      const createdEntity = await createEntityAPI(apiUrl, entityData, token);
      setIsLoading(false);
      toast.success('Entity created successfully!');
      return createdEntity;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error('Failed to create entity. Please try again.');
    }
  };

  return { createEntity, isLoading, error };
};

export default useCreate;
