import { useState } from 'react';
import { updateEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useUpdate = (apiUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEntity = async (entityId, updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedEntity = await updateEntityAPI(apiUrl, entityId, updatedData);
      setIsLoading(false);
      toast.success('Entity updated successfully!');
      return updatedEntity;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error('Failed to update entity. Please try again.');
    }
  };

  return { updateEntity, isLoading, error };
};

export default useUpdate;
