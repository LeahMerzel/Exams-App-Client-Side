import { useState } from 'react';
import { updateEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useUser} from '../auth/UserContext';

const useUpdate = (apiUrl) => {
  const {token} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEntity = async (entityTpUpdate) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateEntityAPI(apiUrl, entityTpUpdate, token);
      setIsLoading(false);
      toast.success('Entity updated successfully!');
      return response.data; // Assuming updateEntityAPI returns the updated entity
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error('Failed to update entity. Please try again.');
      throw error; // Re-throw the error to handle it in the calling component
    }
  };

  return { updateEntity, isLoading, error };
};

export default useUpdate;
