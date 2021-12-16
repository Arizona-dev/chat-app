import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch(error => error.json());
 }

function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (String(email) === "" || String(password) === "") {
      setError("Vous devez remplir tout les champs !");
      return;
    }
    const token = await loginUser({
      email,
      password
    });
    if (token.error) setError(token.error);
    else {
      setToken(token);
      navigate('/');
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 m-auto max-w-md py-4 px-8 shadow-lg rounded-lg my-40 border-2 border-gray-100">
      <h1 className="text-xl mt-4 mb-6 font-medium">Se connecter</h1>
      {
        error && <p className="text-sm text-red-500 mt-4 mb-6 font-sm">{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" className="bg-gray-100 px-3 py-1 rounded-md mb-4 w-full" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="bg-gray-100 px-3 py-1 rounded-md w-full mb-10" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white font-medium px-3 py-1 rounded-md w-full mb-4">Se connecter</button>
        <div className="flex text-sm justify-center">
          <p>Vous n'êtes pas encore inscrit ? </p><Link to="/register" className="underline ml-2">S'inscrire</Link>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;

