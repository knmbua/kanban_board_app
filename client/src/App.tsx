import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { getUser } from './api/authAPI';
import { UserData } from './interfaces/UserData';

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser()
      .then((user: UserData | null) => {
        setUser(user);
        setLoading(false);
      });
  }, [])

  return (
    <div className='container'>
      {loading ? (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ): (
        <>
          <Navbar
            user={user}
            setUser={setUser} />
          <main>
            <Outlet context={{
              user,
              setUser
            }} />
          </main>
        </>
      )}
    </div>
  )
}

export default App
