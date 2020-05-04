exports.formatDates = (list) => {
  list.forEach((comment) => {
    comment.created_at = new Date(comment.created_at);
  });
  return list;
}; // not pure needs a refactor

exports.makeRefObj = (list, key, value) => {
  const lookupObj = {};
  list.forEach((row) => {
    lookupObj[row[key]] = row[value];
  });
  return lookupObj;
};

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
};

exports.renameKey = (list, keyToRename, newKey) => {
  list.forEach((comment) => {
    comment[newKey] = comment[keyToRename];
    delete comment[keyToRename];
  });
  return list;
}; // not pure needs refactor
