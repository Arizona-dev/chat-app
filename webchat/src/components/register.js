import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (email === "" || password === "" || name === "" || firstname === "") {
      setError("Vous devez remplir tout les champs !");
      return;
    }
    await registerUser({
      name,
      firstname,
      email,
      password
    });
    navigate('/login');
  }

  return (
    <div className="bg-white dark:bg-zinc-900 m-auto max-w-md py-4 px-6 shadow-lg rounded-lg my-40 border-2 border-gray-100 dark:border-none">
      <h1 className="dark:text-white text-xl mt-4 font-medium">S'inscrire</h1>
      {
        error && <p className="text-sm text-red-500 mt-4 font-sm">{error}</p>
      }
      <form onSubmit={handleSubmit} className="mt-6">
        <input type="text" placeholder="Nom" className="bg-zinc-100 dark:bg-zinc-700 outline-0 dark:text-white px-3 py-1 rounded-md mb-4 w-full" onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Prénom" className="bg-zinc-100 dark:bg-zinc-700 outline-0 dark:text-white px-3 py-1 rounded-md mb-4 w-full" onChange={e => setFirstname(e.target.value)} />
        <input type="email" placeholder="Email" className="bg-zinc-100 dark:bg-zinc-700 dark:text-white px-3 py-1 outline-0 rounded-md mb-4 w-full" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="bg-zinc-100 dark:bg-zinc-700 dark:text-white outline-0 px-3 py-1 rounded-md w-full mb-10" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white font-medium px-3 py-1 rounded-md w-full mb-4">S'inscrire</button>
        <div className="flex text-sm justify-center dark:text-white">
          <p>Vous êtes déjà inscrit ? </p><Link to="/login" className="underline ml-2">Se connecter</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;

