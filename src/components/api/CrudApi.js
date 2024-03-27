// CrudApi.js
  
  export const updateEntityAPI = async (apiUrl, entityToUpdate) => {
    console.log("update entityToUpdate", entityToUpdate)
    try {
      const response = await fetch(apiUrl, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entityToUpdate), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update entity');
      }
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
    
  export const fetchEntityAPI = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {

      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
      if (!response.ok) {
        throw new Error('Failed to fetch entities');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const deleteEntityAPI = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {

        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entity');
      }
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  