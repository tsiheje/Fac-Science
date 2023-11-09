import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import { containerClasses } from "@mui/system";

const Cours = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const Niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;

    const [cours, setCours] = useState([]);
    useEffect (() => {
        const getAllCours = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/cours/${Niveau}/${Mention}/${Parcours}`);
                setCours(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getAllCours();
    }, []);

    const renderContent = (cours) => {
        if (cours.Cours) {
            const fileURL = `http://localhost:4000/Administrateur/uploads/${cours.Cours}`;
            const fileExtension = cours.Cours.split('.').pop().toLowerCase();
            console.log(fileURL);

            if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
                return <img src={fileURL} alt="Image d'annonce" width="100%" height="100%" />;
            } else if (fileExtension === "pdf") {
                return <embed src={fileURL} type="application/pdf" width="100%" height="100%" />;
            } else if (fileExtension === "mp4" || fileExtension === "avi" || fileExtension === "mkv") {
                return <video width="100%" height="100%" controls>
                    <source src={fileURL} type={`video/${fileExtension}`} />
                </video>;
            } else {
                return <a href={fileURL} target="_blank" rel="noopener noreferrer">Télécharger le fichier</a>;
            }
        } else {
            return <p>Aucun fichier trouvé</p>;
        }
    }
    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                {cours.map(cours => (
                    <div className="card-etudiant" key={cours.id}>
                        <div className="anatiny-etudiant">
                            <p>{cours.Libelle}</p>
                            <div className="fichier-anatiny">
                            {renderContent(cours)}
                        </div>
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    )
}

export default Cours;