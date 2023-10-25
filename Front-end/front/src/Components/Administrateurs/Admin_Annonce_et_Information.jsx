import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import ModalAnnonce from "./ModalAnnonce";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import Swal from 'sweetalert2';
// import sary from '../../Assets/Images/3135715.png';


const Admin_Annonce_et_Information = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);

    const [showModal, setshowModal] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    
    const handleshowModal = () => {
        setshowModal(true);
    }
    const handleCloseModal = () => {
        setshowModal(false);
    };

    useEffect(() => {
        
        const getAllAnnonces = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Administrateur/annonce');
                setAnnouncements(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllAnnonces(); 
        
    }, []);
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://votreserveur.com';

    const renderContent = (announcement) => {
        console.log(announcement.Annonce);
        console.log(announcement.Description);
        if (announcement.Annonce) {
            const fileURL = `${baseURL}/uploads/${announcement.Annonce}`;
            const fileExtension = announcement.Annonce.split('.').pop().toLowerCase();
            console.log(fileURL);

            if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
                return <img src={fileURL} alt="Image d'annonce" width="100%" height="100px" />;
            } else if (fileExtension === "pdf") {
                return <embed src={fileURL} type="application/pdf" width="100%" height="200px" />;
            } else if (fileExtension === "mp4" || fileExtension === "avi" || fileExtension === "mkv") {
                return <video width="100%" height="100px" controls>
                    <source src={fileURL} type={`video/${fileExtension}`} />
                </video>;
            } else {
                return <a href={fileURL} target="_blank" rel="noopener noreferrer">Télécharger le fichier</a>;
            }
        } else {
            return <p>Aucun fichier trouvé</p>;
        }
    }

    const showDeleteConfirmation = (announcementId) => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment supprimer cette annonce ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(announcementId);
            }
        });
    };

    const displaySweetAlert = (success) => {
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Les données ont été ajoutées avec succès!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'ajout des données.',
            });
        }
    };
    
    const handleDelete = (announcementID) => {
        console.log(announcementID);
        axios.delete('http://localhost:4000/Administrateur/delete/${announcementId}')
        .then((response) => {
            console.log('Annonce supprimée avec succès');
            
        })
    }

    return (
        <div className="content">
            <NavBar />
            <div className="scroll">
                <div className="buttonajouter" onClick={handleshowModal}>
                    Faire Une Annonce
                </div>
                {showModal && <ModalAnnonce onClose={handleCloseModal} />}
                {announcements.map(announcement => (
                    <div className="card"  key={announcement.id}>
                        <div className="anatiny">
                            <p>{announcement.Date_de_publication.split('T')[0]}</p>
                            <div className="soratra">
                                <p>{announcement.Description}</p>
                            </div>
                            <div className="sary">
                                {renderContent(announcement)} 
                            </div>
                            <div className="action">
                                <div className="voir"><Visibility/></div>
                                <div className="modifier"  onClick={() => handleEdit(announcement.id)} >
                                    <EditIcon/>
                                </div>
                                <div className="supprimer" onClick={() => showDeleteConfirmation(announcement.Id_Annonce)}>
                                    <DeleteIcon/>
                                </div>
                            </div>
                        </div>  
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin_Annonce_et_Information;
