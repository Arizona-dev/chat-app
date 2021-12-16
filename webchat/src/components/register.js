import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

async function registerUser(credentials) {
  return fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function Register() {
  const [name, setName] = useState();
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await registerUser({
      name,
      firstname,
      email,
      password
    });
  }

  return (
    <div className="bg-white dark:bg-gray-900 m-auto max-w-md py-4 px-8 shadow-lg rounded-lg my-40 border-2 border-gray-100">
      <h1 className="text-xl mt-4 mb-6 font-medium">S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" className="bg-gray-100 px-3 py-1 rounded-md mb-4 w-full" onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Prénom" className="bg-gray-100 px-3 py-1 rounded-md mb-4 w-full" onChange={e => setFirstname(e.target.value)} />
        <input type="text" placeholder="Email" className="bg-gray-100 px-3 py-1 rounded-md mb-4 w-full" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="bg-gray-100 px-3 py-1 rounded-md w-full mb-10" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white font-medium px-3 py-1 rounded-md w-full mb-4">S'inscrire</button>
        <div className="flex text-sm justify-center">
          <p>Vous êtes déjà inscrit ? </p><Link to="/login" className="underline ml-2">Se connecter</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;

