import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import GetAppIcon from '@mui/icons-material/GetApp';
import profil from '../../Assets/Images/3135715.png';
import Profile from "./profile";
import Voire from "./Voire";
import examen from '../../Assets/Images/depositphotos_352843958-stock-photo-inscription-exam-results-and-stationary.jpg';
import important from '../../Assets/Images/téléchargement.png';

const Annonce_et_Information = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        
        const getAllAnnonces = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Etudiant/annonce');
                setAnnouncements(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllAnnonces(); 
        
    }, []);

    const [showVoire, setshowVoire] = useState(false);
    const handleShowVoire = () => {
        setshowVoire(true);
    };
    const handlehideVoire = () => {
        setshowVoire(false);
    }

    const renderContent = (announcement) => {
        console.log(announcement.Annonce);
        console.log(announcement.Description);
        if (announcement.Annonce) {
            const fileURL = `http://localhost:4000/Administrateur/uploads/${announcement.Annonce}`;
            const fileExtension = announcement.Annonce.split('.').pop().toLowerCase();
            console.log(fileURL);

            if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
                return <img src={important} alt="Image d'annonce" width="100%" height="100%" />;
            } else if (fileExtension === "pdf") {
                return <img src={examen} alt="Image d'annonce" width="100%" height="100%" />;
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
                        {announcements.map(announcement => (
                            <div className="anaty-annonce">
                                <div className="publieur">
                                    <img src={profil} alt="" width={'15%'}/>
                                    <div className="nom">
                                        <p className="anarana">{announcement.Nom} {announcement.Prenom}</p>
                                        <p className="date">{announcement.Date_de_publication.split('T')[0]}</p>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{announcement.Description}</p>
                                </div>
                                <div className="couverture">
                                    {renderContent(announcement)}
                                    {/* <img src={couverture} alt="" /> */}
                                </div>
                                <div className="action">
                                    <div className="voire" onClick={handleShowVoire}>
                                        <Visibility/>
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

export default Annonce_et_Information;