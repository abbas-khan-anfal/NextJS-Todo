'use client';
import React, { useEffect, useState } from 'react';
import Context from './Context';
import axios from 'axios';

function ContextProvider({ children }) {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserHandler = async () => {
    setLoading(true);
    try
    {
      const response = await axios.get('/api/auth/me');
      setUser(response?.data?.user || {});
    }
    catch(error)
    {
      console.log(error?.response?.data?.message || error?.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserHandler();
  }, []);

  return (
    <Context.Provider value={{
      user, setUser,
    fetchUserHandler,
    loading, setLoading
    }}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider