import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import ModalAnnonce from "./ModalAnnonce";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import Swal from 'sweetalert2';
// import pdfjsLib from 'pdfjs-dist';
import BarNav from "./Navbar";
import { jwtDecode } from "jwt-decode";
import ModalModif from "./ModalModifAnnonce";
import SearchIcon from '@mui/icons-material/Search';

const Admin_Annonce_et_Information = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);

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

    const renderContent = (announcement) => {
        if (announcement.Annonce) {
            const fileURL = `http://localhost:4000/Administrateur/uploads/${announcement.Annonce}`;
            const fileExtension = announcement.Annonce.split('.').pop().toLowerCase();
            console.log(fileURL);

            if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
                return <img src={fileURL} alt="Image d'annonce" width="100%" height="100%" />;
            } else if (fileExtension === "pdf") {
                return (
                <div>
                    <canvas id={`pdf-canvas-${announcement.id}`}></canvas>
                    {/* <script>
                        pdfjsLib.getDocument(fileURL).then((pdf) => {
                        pdf.getPage(1).then((page) => {
                          const canvas = document.querySelector(`#pdf-canvas-${announcement.id}`);
                          const context = canvas.getContext('2d');
                          const viewport = page.getViewport({ scale: 1 });
                          canvas.height = viewport.height;
                          canvas.width = viewport.width;
                          page.render({ canvasContext: context, viewport: viewport });
                        })
                      });
                    </script> */}
                  </div>
                  );
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

    const handleDelete = async (annonceID) => {
        if (annonceID === undefined) {
            console.error('L\'identifiant du devoir est undefined.');
            return;
        }
        try {
            // Faites une requête DELETE pour supprimer le devoir
           await axios.delete(`http://localhost:4000/Administrateur/delete${annonceID}`)

    
            // Affiche une alerte de succès
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'L\'annonce a été supprimé avec succès!',
            });
        } catch (error) {
            console.error(error);
    
            // Affiche une alerte d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la suppression de l\'annonce.',
            });
        }
    };
    
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
                displaySweetAlert();
            }
        });
    };

    const displaySweetAlert = (success) => {
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Suppression avec succès!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur lors de la suppression des données.',
            });
        }
    };
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    
    const [showModalModif, setshowModalModif] = useState(false);

    const handleEdit = (announcementId) => {
        const selectedAnnouncement = announcements.find(announcement => announcement.Id_Annonce === announcementId);
        setSelectedAnnouncement(selectedAnnouncement);
        setshowModalModif(true);
    }

    const handelhideEdit = () => {
        setshowModalModif(false)
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    
        const filtered = announcements.filter(
          (announcement) =>
            announcement.Annonce.toLowerCase().includes(query.toLowerCase()) ||
            announcement.Description.toLowerCase().includes(query.toLowerCase())
        );
    
        setFilteredAnnouncements(filtered);
      };

    return (
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
                <div className="componet-content">
                    <div className="haut">
                        <div className="rechercher">
                            <input type="search" name="recherche" id="" placeholder="rechercher votre annonce..." value={searchQuery} onChange={handleSearch}/>
                        </div>
                        <div className="buttonajouter" onClick={handleshowModal}>
                            Faire Une Annonce
                        </div>
                    </div>
                    <div className="tab">
                        <table>
                            <tr>
                                <th>Annonce</th>
                                <th>Description</th>
                                <th>Date de publication</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            {searchQuery.length === 0
                ? announcements.map((announcement) => (
                    <tr key={announcement.id}>
                      <td>{announcement.Annonce}</td>
                      <td>{announcement.Description}</td>
                      <td>{announcement.Date_de_publication.split('T')[0]}</td>
                      <td>
                        <div className="action">
                          <div
                            className="modifier"
                            onClick={() => handleEdit(announcement.Id_Annonce)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="supprimer"
                            onClick={() =>
                              showDeleteConfirmation(announcement.Id_Annonce)
                            }
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : filteredAnnouncements.map((announcement) => (
                    <tr key={announcement.id}>
                      <td>{announcement.Annonce}</td>
                      <td>{announcement.Description}</td>
                      <td>{announcement.Date_de_publication.split('T')[0]}</td>
                      <td>
                        <div className="action">
                          <div
                            className="modifier"
                            onClick={() => handleEdit(announcement.Id_Annonce)}
                          >
                            <EditIcon />
                          </div>
                          <div
                            className="supprimer"
                            onClick={() =>
                              showDeleteConfirmation(announcement.Id_Annonce)
                            }
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                        </table>
                    </div>
                </div>
            </div>
            {showModal && <ModalAnnonce onClose={handleCloseModal} />}
            {showModalModif && <ModalModif onClose={handelhideEdit} selectedAnnouncement={selectedAnnouncement}/>}
        </div>
    );
}

export default Admin_Annonce_et_Information;
