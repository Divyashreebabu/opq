import React from "react";

const App = () => {
  const handleLogin = (provider) => {
    window.location.href = `http://localhost:4000/auth/${provider}`;
  };

  return (
    <div className="App">
      <h2>Sign Up / Login</h2>
      <button onClick={() => handleLogin("facebook")}>Login with Facebook</button>
      <button onClick={() => handleLogin("google")}>Login with Google</button>
      <button onClick={() => handleLogin("apple")}>Login with Apple</button>
    </div>
  );
};

export default App;
