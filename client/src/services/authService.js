// Función de Login
  export const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    
    // Guardamos el token en RAM (vía api.js) y el usuario en estado
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  // Función de Logout
  export const logout = async () => {
    try 
    {
        await api.post('/logout'); // Tu backend debería borrar la cookie del refreshToken
    } 
    finally 
    {
        setAccessToken(null);
        setUser(null);
    }
  };