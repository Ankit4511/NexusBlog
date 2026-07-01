import { useState } from 'react';
import Context from './Context';

const State = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        id,
         setId
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;
