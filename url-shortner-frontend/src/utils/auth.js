export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user !== null && user !== undefined && user !== '' && user !== 'null';
};

export const getToken = () => {
  // Token is stored in httpOnly cookie, managed by backend
  return null;
};

export const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const setAuthData = (user) => {
  // Token is stored in httpOnly cookie by backend
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};
