const getToken = () => {
  return localStorage.getItem('token') ? true : false;
};

export { getToken };
