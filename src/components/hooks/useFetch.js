import { useState, useEffect } from 'react';
import { fetchEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useFetch = (apiUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchEntityAPI(apiUrl);
      setData(fetchedData);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  return { data, isLoading, error, fetchData };
};

export default useFetch;
