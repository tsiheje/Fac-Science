import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Importez Navigate depuis 'react-router-dom'
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Mot_de_passe: '',
  });

  const [redirectToEtudiant, setRedirectToEtudiant] = useState(false); // État pour gérer la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/Authentification/Login', formData);
      const useData = response.data;
      const Roles = useData.Roles;
      console.log('vous êtes :', Roles);

      if (Roles === 'Etudiant') {
        setRedirectToEtudiant(true); // Définissez redirectToEtudiant sur true pour activer la redirection
      }

    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  // Si redirectToEtudiant est true, effectuez la redirection
  if (redirectToEtudiant) {
    return <Navigate to="/Etudiant" />;
  }

  return (
    <div className='login'>
      <div className='left'>
      </div>
      <div className='right'>
        <div>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div>
              <label>Email :</label><br></br>
              <input type="email" name="Email" onChange={handleChange} placeholder='Adresse Email'/>
            </div>
            <div>
              <label>Mot de passe :</label><br></br>
              <input type="password" name="Mot_de_passe" onChange={handleChange} placeholder='Mot de passe'/>
            </div>
              <Link>Mot de passe oublié?</Link><br></br>
            <div>
              <button type="submit" className='connecte'>Se connecter</button><br></br><br></br>
              <hr></hr>
              <Link to='/CompteEtudiant'>S'inscrire</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
