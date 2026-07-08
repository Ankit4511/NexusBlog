import { useState } from 'react';
import Context from './Context';

const State = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkCount, setBookmarkCount] = useState(0);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,

        user,
        setUser,

        searchQuery,
        setSearchQuery,

        bookmarkCount,
        setBookmarkCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;