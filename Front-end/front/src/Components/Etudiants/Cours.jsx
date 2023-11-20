import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import profil from '../../Assets/Images/3135715.png';
import { containerClasses } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import GetAppIcon from '@mui/icons-material/GetApp';
import Profile from "./profile";
import Voire from "./Voire";
import couverture from '../../Assets/Images/86236b79bc088fbe383716452370016caf64dc31.jpg';

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

    const [showVoire, setshowVoire] = useState(false);
    const handleShowVoire = () => {
        setshowVoire(true);
    };
    const handlehideVoire = () => {
        setshowVoire(false);
    }

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
                {/* <div className="left">
                    <Profile/>
                </div> */}
                <div className="gauche">
                    {/* <div className="recherche">
                        <input type="search" name="recherche" id="recherche" placeholder="rechercher votre besoin..."/>
                        <div className="search-icon"></div>
                    </div> */}
                    <div className="right-contenu">
                        {cours.map(cour => (
                            <div className="anaty-cours">
                                <div className="cours">
                                    Cours
                                </div>
                                <div className="couverture">
                                    <img src={couverture} alt=""/>
                                </div>
                                <div className="description">
                                    <p className="libelle">{cour.Libelle}</p>
                                    <p className="resume">{cour.Description}</p>
                                </div>
                                <div className="ambany">
                                    <div className="publieur">
                                        <img src={profil} alt="" width={'15%'}/>
                                        <div className="nom">
                                            <p className="anarana">{cour.Id_Professeur}</p>
                                            <p className="date">{cour.Date_de_creation.split('T')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="action">
                                        <div className="voire" onClick={handleShowVoire}>
                                            <Visibility/>
                                        </div>
                                        <div className="down">
                                            <GetAppIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showVoire && <Voire onClose={handlehideVoire}/>}
        </div>
    )
}

export default Cours;