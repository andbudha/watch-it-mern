const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};

const removeToken = () => {
  localStorage.removeItem('token');
};
export { getToken, removeToken };
