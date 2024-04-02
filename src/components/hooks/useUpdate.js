import { useState } from 'react';
import { updateEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useUpdate = (apiUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEntity = async (entityToUpdate) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateEntityAPI(apiUrl, entityToUpdate);
      setIsLoading(false);
      toast.success('Updated successfully!');
      return response; 
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error('Failed to update. Please try again.');
    }
  };

  return { updateEntity, isLoading, error };
};

export default useUpdate;
