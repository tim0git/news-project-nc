exports.formatDates = (myArray) => {
  const newArr = [];
  // create copy of array
  for (let i in myArray) {
    newArr.push({ ...myArray[i] });
  }
  newArr.forEach((comment) => {
    comment.created_at = new Date(comment.created_at);
  });
  return newArr;
}; // done & pure

exports.makeRefObj = (list, key, value) => {
  const lookupObj = {};
  list.forEach((row) => {
    lookupObj[row[key]] = row[value];
  });
  return lookupObj;
}; // done & pure

exports.formatComments = (
  commentsData,
  lookupObj,
  keyToChange,
  keyToCreate
) => {
  const formattedShops = commentsData.map((comment) => {
    const { [keyToChange]: key, ...restOfKeys } = comment;
    return { [keyToCreate]: lookupObj[key], ...restOfKeys };
  });
  return formattedShops;
}; // done & pure

exports.renameKey = (myArray, keyToRename, newKey) => {
  const newArr = [];
  // create copy of array
  for (let i in myArray) {
    newArr.push({ ...myArray[i] });
  }
  newArr.forEach((comment) => {
    comment[newKey] = comment[keyToRename];
    delete comment[keyToRename];
  });
  return newArr;
}; // done & pure
