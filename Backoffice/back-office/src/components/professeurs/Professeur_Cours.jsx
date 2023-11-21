import React, { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ModaleCours from "./ModaleCours";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import ModaleModifCour from "./ModaleModifCour";

const Professeur_Cours = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id = decodedToken.Id_compte;

    const [showModal, setshowModal] = useState(false);
    const [cours, setCours] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleshowModal = () => {
        setshowModal(true);
    }
    const handlehideModal = () => {
        setshowModal(false);
    }

    const getAllCours = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/Professeur/cours/${Id}`);
            setCours(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if(showModal){
            getAllCours();
        }
        getAllCours();

    }, [showModal]);

    const showDeleteConfirmation = (coursID) => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment supprimer cette annonce ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(coursID);
                // displaySweetAlert();
            }
        });
    };

    const [selectedCours, setSelectedCours] = useState(null);

    const handleDelete = async (coursID) => {
        if (coursID === undefined) {
            console.error('L\'identifiant du devoir est undefined.');
            return;
        }
        try {
            // Faites une requête DELETE pour supprimer le devoir
            await axios.delete(`http://localhost:4000/Professeur/cours/${coursID}`);
    
            // Affiche une alerte de succès
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Le devoir a été supprimé avec succès!',
            });
        } catch (error) {
            console.error(error);
    
            // Affiche une alerte d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la suppression du devoir.',
            });
        }
    };
    const [showModalModif, setshowModalModif] = useState(false);

    const handleEdit = (courId) => {
        const selectedCoursId = cours.find(cour => cour.Id_cours === courId);
        setSelectedCours(selectedCoursId);
        console.log(selectedCoursId);

        setshowModalModif(true);
    }

    const handelhideEdit = () => {
        setshowModalModif(false)
    }

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const filteredCours = cours.filter((cour) =>
        cour.Libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cour.Description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compents">
                <div className="compents-content">
                    <div className="haut">
                        <div className="rechercher">
                            <input type="search" name="recherche" id="" placeholder="rechercher votre cours..." value={searchQuery}
                                onChange={handleSearch}/>
                        </div>
                        <div className="buttonajouter" onClick={handleshowModal}>
                            Créer un cour
                        </div>
                    </div>
                    <div className="tab">
                        <table>
                            <tr>
                                <th>Libelle</th>
                                <th>Description</th>
                                <th>Niveau</th>
                                <th>Mention</th>
                                <th>Parcours</th>
                                <th>Cours</th>
                                <th>Date de creation</th>
                                <th>Action</th>
                            </tr>
                            {filteredCours.map(cour => (
                                <tr key={cour.id}>
                                    <td>{cour.Libelle}</td>
                                    <td>{cour.Description}</td>
                                    <td>{cour.Niveau}</td>
                                    <td>{cour.Mention}</td>
                                    <td>{cour.Parcours}</td>
                                    <td>{cour.Cours}</td>
                                    <td>{cour.Date_de_creation.split('T')[0]}</td>
                                    <td>
                                        <div className="action">
                                            <div className="modifier" onClick={() => handleEdit(cour.Id_cours)}>
                                                <EditIcon />
                                            </div>
                                            <div className="supprimer" onClick={() => showDeleteConfirmation(cour.Id_cours)}>
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
            {showModal && <ModaleCours onClose={handlehideModal}/>}
            {showModalModif && <ModaleModifCour onClose={handelhideEdit} selectedCours={selectedCours}/>}
        </div>
    )
}

export default Professeur_Cours;