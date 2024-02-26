import { useState } from 'react';
import { deleteEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useDelete = (apiUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEntity = async (entityId) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteEntityAPI(apiUrl, entityId);
      setIsLoading(false);
      toast.success('Entity deleted successfully!');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error('Failed to delete entity. Please try again.');
    }
  };

  return { deleteEntity, isLoading, error };
};

export default useDelete;
