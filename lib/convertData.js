
// const removeNonSerializableFields = (obj) => {
//   const cleanedObject = {};

//   for (const key in obj) {
//     if (typeof obj[key] !== 'object' || obj[key] === null || key === 'buffer') {
//       cleanedObject[key] = obj[key];
//     }
//   }

//   return cleanedObject;
// };

// export const replaceMongoIdInArray = (array) => {
//   const mappedArray = array
//     .map((item) => {
//       return {
//         id: item._id.toString(),
//         ...removeNonSerializableFields(item),
//       };
//     })
//     .map(({ _id, ...rest }) => rest);

//   return mappedArray;
// };

// export const replaceMongoIdInObject = (obj) => {
//   const { _id, ...updatedObj } = {
//     ...removeNonSerializableFields(obj),
//     id: obj?._id.toString(),
//   };
//   return updatedObj;
// };

export const replaceMongoIdInArray = (array) => {
  const mappedArray = array.map(item => {
    return {
      id: item._id.toString(),
      ...item
    }
  }).map(({_id, ...rest}) => rest);

  return mappedArray;
}

export const replaceMongoIdInObject = (obj) => {
  const {_id, ...updatedObj} = {...obj, id: obj?._id.toString()};
 return updatedObj;
}
