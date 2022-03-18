export function serialize(object) {
  let queryString = "";
  for (let key in object) {
    queryString += `&${key}=${object[key]}`;
  }
  return queryString;
}
