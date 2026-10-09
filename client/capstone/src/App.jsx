import React, {useState} from 'react'
import Signup from "./pages/signup";
import Login from "./pages/login";

const App = () => {
  const [page, setPage] = useState("signup");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("signup")}>
          Sign Up
        </button>

        <button onClick={() => setPage("login")}>
          Login
        </button>
      </nav>

      {page === "signup" ? <Signup /> : <Login />}
    </div>
  );
}

export default App