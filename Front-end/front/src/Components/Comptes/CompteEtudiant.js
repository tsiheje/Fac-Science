import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Compte.css'


const CompteEtudiant = () => {
    const [showVerification, setShowVerification] = useState(false);
    const [showInfogen, setShowInfogen] = useState(true)
    const [parcoursOptions, setParcoursOptions] = useState([]);

    const [formData, setFormData] = useState({
        Nom:'',
        Prenom:'',
        Matricul:'',
        Mention:'',
        Parcours:'',
        Niveau:'',
        Telephone:'',
        Email:'',
        Mot_de_passe:'',
        Roles:'Etudiant',
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "Mention") {
            switch (value) {
              case "Mathematique et Informatique":
                setParcoursOptions(["Mathematique Fondamentale", "Mathematique Elementaire", "MISS"]);
                break;
              case "Physique Chimie":
                setParcoursOptions(["Physique", "Chimie"]);
                break;
              case "Science de la Vie":
                setParcoursOptions(["Bio diversité Tropicale", "Bio moleculaire"]);
                break;
              default:
                setParcoursOptions([]);
                break;
            }
          }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        console.log(formData);
        const response = await axios.post('http://localhost:4000/Authentification/Signup', formData);
        console.log(response.data);
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      };

     const afficherVerification = () => {
          setShowVerification(true);
          setShowInfogen(false);
      };

      const retouner = () => {
        setShowVerification(false);
        setShowInfogen(true);
      };

    return(
        <div>
            <h1>Creation de compte Etudiant</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="infogen" style={{ display: showInfogen ? "block" : "none" }}>
                    <div>
                        <label>Nom :</label><br></br>
                        <input type="text" name="Nom" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Prénom :</label><br></br>
                        <input type="text" name="Prenom" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Nº Matricul :</label><br></br>
                        <input type="text" name="Matricul" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Mention :</label><br></br>
                        <select name="Mention" onChange={handleChange}>
                            <option value="">Sélectionnez votre mention</option>
                            <option value="Mathematique et Informatique">Mathematique et Informatique</option>
                            <option value="Physique Chimie">Physique Chimie</option>
                            <option value="Science de la Vie">Science de la Vie</option>
                        </select>
                    </div>
                    <div>
                        <label>Parcours :</label><br></br>
                        <select name="Parcours" onChange={handleChange}>
                            <option value="">Sélectionnez votre parcours</option>
                            {parcoursOptions.map((parcours, index) => (
                            <option key={index} value={parcours}>
                                {parcours}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Niveau :</label><br></br>
                        <select name="Niveau" onChange={handleChange}>
                            <option>Vous etes de quel niveau</option>
                            <option>S1</option>
                            <option>S2</option>
                            <option>S3</option>
                            <option>S4</option>
                            <option>S5</option>
                            <option>S6</option>
                            <option>S7</option>
                            <option>S8</option>
                            <option>S9</option>
                            <option>S10</option>
                        </select>
                    </div>
                    <button onClick={afficherVerification} type="button">Suivant</button>
                </div>
                <div className="verification" style={{ display: showVerification ? "block" : "none" }}>
                <div>
                    <label>Nº Téléphone :</label><br></br>
                    <input type="text" name="Telephone" onChange={handleChange} />
                </div>
                <div>
                    <label>Email :</label><br></br>
                    <input type="mail" name="Email" onChange={handleChange} />
                </div>
                <div>
                    <label>Mot de passe :</label><br></br>
                    <input type="password" name="Mot_de_passe" onChange={handleChange} />
                </div>
                <div>
                    <label>Confirmation de mot de passe :</label><br></br>
                    <input type="password" name="confirmation" onChange={handleChange} />
                </div>
                <button onClick={retouner} type="button">Retour</button>
                <button type="submit" >Créer</button><br></br>
                </div>
                <Link to='/'>J'ai un  compte</Link>
                <Link to='/CompteEnseignant'>Je suis un Professeur</Link>
            </form>
        </div>
    )
}

export default CompteEtudiant;