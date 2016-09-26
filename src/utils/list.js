// This method will replace a list object depending on its id.
const replaceInList = (myList, myObject) =>
  myList.map(o => (
    !('id' in o) || o.id !== myObject.id ? o : myObject
  ));

export default replaceInList;