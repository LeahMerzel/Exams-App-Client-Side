import { useState } from 'react';
import { updateEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {useUser} from '../auth/UserContext';

const useUpdate = (apiUrl) => {
  // const {token} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEntity = async (entityToUpdate) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateEntityAPI(apiUrl, entityToUpdate);
      setIsLoading(false);
      toast.success('Entity updated successfully!');
      return response; 
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error('Failed to update entity. Please try again.');
    }
  };

  return { updateEntity, isLoading, error };
};

export default useUpdate;
