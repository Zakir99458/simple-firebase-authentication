import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';


initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
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

  const handleGitHubSignIn = () => {
      signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        console.log(result);
       
    })
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGitHubSignIn}>GitHub Sign In</button>

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
