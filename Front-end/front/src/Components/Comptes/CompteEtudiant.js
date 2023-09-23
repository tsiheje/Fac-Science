import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Compte.css'


const CompteEtudiant = () => {
    const navigate = useNavigate()
    const [image, setFile] = useState(null);
    const [showVerification, setShowVerification] = useState(false);
    const [showInfogen, setShowInfogen] = useState(true)
    const [parcoursOptions, setParcoursOptions] = useState([]);

    const GoToLogin = () =>{
        navigate('/')
    };

    const GoToEnseignant = () => {
        navigate('/CompteEnseignant')
    }
    const [formData, setFormData] = useState({
        // nom: '',
        // prenom: '',
        // matricul: '',
        // mention: '',
        // parcours: '',
        // niveau: '',
        // telephone: '',
        // email: '',
        // mot_de_passe: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "mention") {
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
          const response = await axios.post('http://localhost:4000/auth/login', formData);
          console.log(response.data);
          // Stockez le token JWT dans le stockage local ou les cookies ici
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      };

      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };

      
      const cacher =  () => {
          setShowInfogen(false);
        };
        
        const afficherVerification = () => {
          setShowVerification(true);
          cacher();
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
                        <input type="file" accept="image" onChange={handleFileChange} />
                    </div>
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
                        <label>Mention :</label><br></br>
                        <select name="mention" onChange={handleChange}>
                            <option value="">Sélectionnez votre mention</option>
                            <option value="Mathematique et Informatique">Mathematique et Informatique</option>
                            <option value="Physique Chimie">Physique Chimie</option>
                            <option value="Science de la Vie">Science de la Vie</option>
                        </select>
                    </div>
                    <div>
                        <label>Parcours :</label><br></br>
                        <select name="parcours" onChange={handleChange}>
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
                        <select name="niveau" onChange={handleChange}>
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
                    <button onClick={afficherVerification}>Suivant</button>
                </div>
                <div className="verification" style={{ display: showVerification ? "block" : "none" }}>
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
                <button onClick={retouner}>Retour</button>
                <button type="submit">Créer</button><br></br>
                </div>
                    <button type="button" onClick={GoToLogin}>j'ai un compte</button><br></br>
                    <button type="button" onClick={GoToEnseignant}>je suis un professeur</button><br></br>
            </form>
        </div>
    )
}

export default CompteEtudiant;