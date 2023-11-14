import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import sary from '../../Assets/Images/3135715.png';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import Visibility from '@mui/icons-material/Visibility';


const Admin_Etudiant = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        
        const getAllEtudiants = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Administrateur/etudiants');
                setEtudiants(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAllEtudiants(); 
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
    

    return (
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
                <  div className="haut">
                    <div className="rechercher">
                        <input type="search" name="recherche" id="" placeholder="rechercher Etudiants..."/>
                    </div>
                </div>
            <table>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Niveau</th>
                        <th>Metion</th>
                        <th>Parcours</th>
                        <th>Telephone</th>
                        <th>Email</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                {etudiants.map(etudiant => (
                    <tr key={etudiant.id}>
                        <td>{etudiant.Matricul}</td>
                        <td>{etudiant.Nom}</td>
                        <td>{etudiant.Prenom}</td>
                        <td>{etudiant.Niveau}</td>
                        <td>{etudiant.Mention}</td>
                        <td>{etudiant.Parcours}</td>
                        <td>{etudiant.Telephone}</td>
                        <td>{etudiant.Email}</td>
                        <td>
                            <div className="action">
                                <div className="voir"><Visibility/></div>
                                <div className="supprimer" onClick={() => showDeleteConfirmation(etudiant.Id_compte)}>
                                    <DeleteIcon/>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </table>
            </div>
        </div>
    )
}

export default Admin_Etudiant;
