import { useState, useEffect } from 'react';
import { fetchEntityAPI } from '../api/CrudApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useFetch = (apiUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchEntityAPI(apiUrl);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        toast.error('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, isLoading, error };
};

export default useFetch;
