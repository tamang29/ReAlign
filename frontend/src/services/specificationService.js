// Function to fetch specifications for a given project ID
export const fetchSpecifications = async (projectId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/specification/${projectId}`);
    
    if (!response.ok) {
      if (response.status === 404) { // No specifications created for this project
        console.log('No specifications created for this project');
        return []; 
      }
    }
    
    const data = await response.json();
    return data.specifications;
    
  } catch (error) {
    console.error('Error fetching specifications:', error);
    throw error;
  }
};

// Function to save a new specification document
  export const saveSpecification = async (newDocument) => {
    try {
      const saveResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/specification/create-or-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDocument)
      });
  
      if (!saveResponse.ok) {
        throw new Error('Failed to save specification');
      }
  
      const savedDocument = await saveResponse.json();
      return savedDocument.specification;
    } catch (error) {
      console.error('Error saving specification:', error);
      throw error;
    }
  };
  
  export const deleteSpecification = async (documentId) => {
    try {
      const deleteResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/specification/delete/${documentId}`, {
        method: 'DELETE'
      });
  
      if (!deleteResponse.ok) {
        throw new Error('Failed to delete specification');
      }
    } catch (error) {
      console.error('Error deleting specification:', error);
      throw error;
    }
  };
  
  // Function to pin or unpin a specification document by documentId
  export const pinSpecification = async (documentId, pinned) => {
    try {
      const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/specification/pin/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pinned })
      });
  
      if (!updateResponse.ok) {
        throw new Error('Failed to pin/unpin specification');
      }
  
      const updatedDocument = await updateResponse.json();
      return updatedDocument.specification;
    } catch (error) {
      console.error('Error pinning/unpinning specification:', error);
      throw error;
    }
  };
  