const getToken = () => {
  return localStorage.getItem('token') ? true : false;
};

const removeToken = () => {
  localStorage.removeItem('token');
};
export { getToken, removeToken };
