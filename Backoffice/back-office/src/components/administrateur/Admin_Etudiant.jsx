import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import BarNav from "./Navbar";
import Swal from 'sweetalert2';

const Admin_Etudiant = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [etudiants, setEtudiants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleDelete = (etudiantID) => {
        console.log(etudiantID);
        axios.delete(`http://localhost:4000/Administrateur/supprimer${etudiantID}`)
        .then((response) => {
            console.log('Etudiant supprimé avec succès');
        })
    }

    const showDeleteConfirmation = (etudiantID) => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment supprimer cet étudiant ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(etudiantID);
                displaySweetAlert(true);
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

    const filteredEtudiants = etudiants.filter(etudiant =>
        etudiant.Matricul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Niveau.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Mention.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Parcours.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Telephone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="content">
            <div className="nav">
                <BarNav />
            </div>
            <div className="compent">
                <div className="componet-content">
                    <div className="haut">
                        <div className="rechercher">
                            <input
                                type="search"
                                name="recherche"
                                id=""
                                placeholder="rechercher Etudiants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="tab">
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
                            {filteredEtudiants.map(etudiant => (
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
                                            <div className="supprimer" onClick={() => showDeleteConfirmation(etudiant.Id_compte)}>
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
        </div>
    );
}

export default Admin_Etudiant;
