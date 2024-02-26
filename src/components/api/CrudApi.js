// CrudApi.js

export const createEntityAPI = async (apiUrl, entityData) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
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
  
  export const updateEntityAPI = async (apiUrl, entityId, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/${entityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update entity');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const fetchEntityAPI = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch entities');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const deleteEntityAPI = async (apiUrl, entityId) => {
    try {
      const response = await fetch(`${apiUrl}/${entityId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete entity');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  