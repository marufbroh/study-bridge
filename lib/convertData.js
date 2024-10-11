// Utility function to remove non-serializable fields like 'buffer'
const removeNonSerializableFields = (obj) => {
  const cleanedObject = {};

  for (const key in obj) {
    if (typeof obj[key] !== 'object' || obj[key] === null || key === 'buffer') {
      cleanedObject[key] = obj[key];
    }
  }

  return cleanedObject;
};

// Function to replace Mongo _id and remove non-serializable fields in an array
export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...removeNonSerializableFields(item), // Apply the cleaning function
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

// Function to replace Mongo _id and remove non-serializable fields in an object
export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = {
    ...removeNonSerializableFields(obj), // Apply the cleaning function
    id: obj?._id.toString(),
  };
  return updatedObj;
};
