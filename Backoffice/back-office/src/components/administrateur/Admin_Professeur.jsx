import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import ModalProfesseur from "./ModalProfesseur";
import sary from '../../Assets/Images/3135715.png';
import tel from '../../Assets/Images/telephone.png';
import mail from '../../Assets/Images/email.png';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BarNav from "./Navbar";
import Swal from 'sweetalert2';
import Visibility from '@mui/icons-material/Visibility';


const Admin_Professeur = () => {
    const token = Cookies.get('token');
    console.log(token);

    //jwt_decode pour décoder le token
    const decodedToken = jwtDecode(token);

    console.log(decodedToken.Roles);
    
    const [showModal, setshowModal] = useState(false);

    const handleshowModal = () => {
        setshowModal(true);
    }

    const handleCloseModal = () => {
        setshowModal(false);
      };

    const [Professeur, setprofesseur] = useState([]);

    useEffect(() => {
        
        const getAllProfesseurs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Administrateur/professeurs');
                setprofesseur(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAllProfesseurs(); 
    }, []);
    const handleDelete = (announcementID) => {
        console.log(announcementID);
        axios.delete(`http://localhost:4000/Administrateur/delete${announcementID}`)
        .then((response) => {
            console.log('Annonce supprimée avec succès');
            
        })
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
    
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
                <div className="componet-content">
                    <div className="haut">
                        <div className="rechercher">
                            <input type="search" name="recherche" id="" placeholder="rechercher Professeur..."/>
                        </div>
                        <div className="buttonajouter" onClick={handleshowModal}>
                            Creer compte Professeur
                        </div>
                    </div>
                    <div className="tab">
                        <table>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Telephone</th>
                                <th>Email</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            {Professeur.map(Professeurs => (
                                <tr key={Professeurs.id}>
                                    <td>{Professeurs.Nom}</td>
                                    <td>{Professeurs.Prenom}</td>
                                    <td>{Professeurs.Telephone}</td>
                                    <td>{Professeurs.Email}</td>
                                    <td>
                                    <div className="action">
                                        <div className="supprimer" onClick={() => showDeleteConfirmation(Professeurs.Id_compte)}>
                                            <DeleteIcon/>
                                        </div>
                                    </div>
                                </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
            {showModal && <ModalProfesseur onClose={handleCloseModal}/>}
        </div>
    )
}

export default Admin_Professeur;