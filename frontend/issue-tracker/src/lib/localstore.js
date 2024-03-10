export const getFromLS = (item) => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(item);
  }
  return null;
};
export const setToLS = (item, value) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(item, value);
  }
};
