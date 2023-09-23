import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await axios.post('http://localhost:4000/Authentification/login', formData);
      console.log(response.data);
      // Stockez le token JWT dans le stockage local ou les cookies ici
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  const goToSignup = () => {
    navigate('/CompteEtudiant'); 
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div>
          <label>Email :</label><br></br>
          <input type="text" name="email" onChange={handleChange} />
        </div>
        <div>
          <label>Mot de passe :</label><br></br>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        
        <button type="submit">Se connecter</button><br></br>
        <button type="button" onClick={goToSignup}>S'inscrire</button>
      </form>
    </div>
  );
};

export default Login;
