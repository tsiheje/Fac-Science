import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";


const CompteEnseignant = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        mention: '',
        parcours: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            console.log(formData);
          const response = await axios.post('http://localhost:4000/auth/login', formData);
          console.log(response.data);
          // Stockez le token JWT dans le stockage local ou les cookies ici
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      };

    return(
        <div>
                <h1>je suis un Enseignant</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <label>Nom :</label><br></br>
                    <input type="text" name="nom" onChange={handleChange} />
                </div>
                <div>
                    <label>Prénom :</label><br></br>
                    <input type="text" name="prenom" onChange={handleChange} />
                </div>
                <div>
                    <label>Nº Matricul :</label><br></br>
                    <input type="text" name="matricul" onChange={handleChange}/>
                </div>
                <div>
                    <label>Nº Téléphone :</label><br></br>
                    <input type="text" name="telephone" onChange={handleChange} />
                </div>
                <div>
                    <label>Email :</label><br></br>
                    <input type="mail" name="mail" onChange={handleChange} />
                </div>
                <div>
                    <label>Mot de passe :</label><br></br>
                    <input type="password" name="mot_de_passe" onChange={handleChange} />
                </div>
                <div>
                    <label>Confirmation de mot de passe :</label><br></br>
                    <input type="password" name="confirmation" onChange={handleChange} />
                </div>
                    <button type="submit">Créer</button><br></br>
                    <Link to='/'>J'ai un  compte</Link>
                    <Link to='/CompteEnseignant'>Je suis un Professeur</Link>
                </form>
        </div>
    )
}

export default CompteEnseignant;