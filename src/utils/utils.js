export const saveLocalStore = (key, value) => {
  const string = JSON.stringify(value);
  localStorage.setItem(key, string);
};

export const getLocalStore = (key) => {
  const dataLocal = JSON.parse(localStorage.getItem(key));
  return dataLocal;
};
