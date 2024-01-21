import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';


initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const {displayName, email, photoURL} = result.user;
        
        const logedInUser = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setUser(logedInUser);
      })
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      {
        user.email && <div>
        <h2>Welcome !!! {user.name}</h2>
        <h3>email address: {user.email}</h3>
        <img src={user.image}></img>
      </div>
      }
    </div>
  );
}

export default App;
