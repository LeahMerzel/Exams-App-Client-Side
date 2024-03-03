// CrudApi.js
export const createEntityAPI = async (apiUrl, entityData, token) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entityData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create entity');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const updateEntityAPI = async (apiUrl, entityToUpdate, token) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entityToUpdate), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update entity');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
    
  export const fetchEntityAPI = async (token, apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
      method: 'GET',  
      headers: {
        'Authorization': `Bearer ${token}`,
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
  
  export const deleteEntityAPI = async (apiUrl, entityId, token) => {
    try {
      const response = await fetch(`${apiUrl}/${entityId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entity');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  