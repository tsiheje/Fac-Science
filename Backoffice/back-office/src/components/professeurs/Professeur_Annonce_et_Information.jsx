import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import ModaleAnnonce from "./ModaleAnnonce";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import Swal from 'sweetalert2';
import BarNav from "./Navbar";

const Professeur_Annonce_et_Information = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);

    const [showModal, setshowModal] = useState(false);
    const handleshowModal = () => {
        setshowModal(true);
    }
    const handleCloseModal = () => {
        setshowModal(false);
    };

    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        
        const getAllAnnonces = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Professeur/annonce');
                setAnnouncements(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllAnnonces(); 
        
    }, []);

    const renderContent = (announcement) => {
        console.log(announcement.Annonce);
        console.log(announcement.Description);
        if (announcement.Annonce) {
            const fileURL = `http://localhost:4000/Administrateur/uploads/${announcement.Annonce}`;
            const fileExtension = announcement.Annonce.split('.').pop().toLowerCase();
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
    const showDeleteConfirmation = (announcementID) => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment supprimer cette annonce ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(announcementID);
                // displaySweetAlert();
            }
        });
    };

    const handleDelete = () => {

    }
    const handleEdit = () => {

    }
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
                <div className="haut">
                    <div className="rechercher">
                        <input type="search" name="recherche" id="" placeholder="rechercher votre annonce..."/>
                    </div>
                    <div className="buttonajouter" onClick={handleshowModal}>
                        Faire Une Annonce
                    </div>
                </div>
                <table>
                    <tr>
                        <th>Annonce</th>
                        <th>Description</th>
                        <th>Date de publication</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    {announcements.map(announcement => (
                            <tr key={announcement.id}>
                                <td>{announcement.Annonce}</td>
                                <td>{announcement.Description}</td>
                                <td>{announcement.Date_de_publication.split('T')[0]}</td>
                                <td>
                                    <div className="action">
                                        <div className="voir"><Visibility/></div>
                                        <div className="modifier" onClick={() => handleEdit(announcement.id)}>
                                            <EditIcon/>
                                        </div>
                                        <div className="supprimer" onClick={() => showDeleteConfirmation(announcement.Id_Annonce)}>
                                            <DeleteIcon/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </table>
            </div>
            {showModal && <ModaleAnnonce onClose={handleCloseModal} />}
        </div>
    )
}

export default Professeur_Annonce_et_Information;