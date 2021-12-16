import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import useToken from './hooks/useToken';
import "./App.css";

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;

function Home() {
  return (
    <>
      <main>
        <h1>Bienvenue !</h1>
      </main>
    </>
  );
}
