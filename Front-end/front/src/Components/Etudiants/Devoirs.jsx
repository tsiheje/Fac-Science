import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import Profile from "./profile";
import profil from '../../Assets/Images/3135715.png';
import { containerClasses } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Soumettre from "./Soumettre";
import Voire from "./Voire";
import couverture from '../../Assets/Images/24493965-vue-en-plongée-verticale-de-garçon-étudiant-dans-la-chambre-à-coucher.jpg';

const Devoirs = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const Niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;

    const [devoirs, setDevoirs] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        const getAllDevoirs = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/devoirs/${Niveau}/${Mention}/${Parcours}`);
                setDevoirs(response.data);
                console.log(response.data)
            }catch(error){
                console.error(error)
            }
        }
        getAllDevoirs();
    }, []);
    const [showSoumettre, setShowSoumettre] = useState(false);
    const handleShowSoumettre = (devoirId) => {
        setSelectedElement(devoirId);
        console.log(devoirId)
        setShowSoumettre(true);
    };
    const handleHideSoumettre = () => {
        setSelectedElement(null);
        setShowSoumettre(false);
    };

    const handleDownload = (devoir) => {
        console.log(devoir)
        const fileURL = `http://localhost:4000/Administrateur/uploads/${devoir.Devoirs}`;
        window.open(fileURL, '_blank');
    };

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
                        {devoirs.map(devoir => (
                            <div className="anaty-devoir">
                                <div className="devoir">
                                    Devoir
                                </div>
                                <div className="couverture">
                                    <img src={couverture} alt=""/>
                                </div>
                                <div className="description">
                                    <p className="libelle">{devoir.Libelle}</p>
                                    <p className="resume">{devoir.Description}</p>
                                </div>
                                <div className="ambany">
                                    <div className="publieur">
                                        <img src={profil} alt="" width={'15%'}/>
                                        <div className="nom">
                                            <p className="anarana">Pr. {devoir.Prenom}</p>
                                            <p className="date">{devoir.Date_de_devoirs.split('T')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="action">
                                        <div className="upload" onClick={() => handleShowSoumettre(devoir.Id_devoirs)}>
                                            <CloudUploadIcon/>
                                        </div>
                                        {/* <div className="voire" onClick={() => handleShowVoire(devoir)}>
                                            <Visibility/>
                                        </div> */}
                                        <div className="down" onClick={() => handleDownload(devoir)}>
                                        <Visibility/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showSoumettre && <Soumettre devoirId={selectedElement} onClose={handleHideSoumettre} />}
        </div>
    )
}

export default Devoirs;