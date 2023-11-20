import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ModaleDevoirs from "./ModaleDevoirs";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import ModaleModifDevoir from "./ModaleModifDevoir";

const Professeur_Devoirs = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id_Professeur = decodedToken.Id_compte;
    const [showModal, setshowModal] = useState(false);

    const handleshowModal = () => {
        setshowModal(true);
    }

    const handlehideModal = () => {
        setshowModal(false);
    }

    const [devoirs, setDevoirs] = useState([]);

    useEffect(() => {
        
        const getAlldevoirs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/Professeur/devoirs/${Id_Professeur}`);
                setDevoirs(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAlldevoirs(); 
        
    }, []);

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
    const [showModalModif, setshowModalModif] = useState(false);

    const handleEdit = (Id) => {
        setshowModalModif(true)
    }

    const handelhideEdit = () => {
        setshowModalModif(false)
    }
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compents">
                <div className="compents-content">
                    <div className="haut">
                        <div className="rechercher">
                            <input type="search" name="recherche" id="" placeholder="rechercher votre devoirs..."/>
                        </div>
                        <div className="buttonajouter" onClick={handleshowModal}>
                            +
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
                                <th>Devoirs</th>
                                <th>Date de creation</th>
                                <th>Date de soumis</th>
                                <th>Action</th>
                            </tr>
                            {devoirs.map(devoir => (
                            <tr key={devoir.id}>
                                <td>{devoir.Libelle}</td>
                                <td>{devoir.Description}</td>
                                <td>{devoir.Niveau}</td>
                                <td>{devoir.Mention}</td>
                                <td>{devoir.Parcours}</td>
                                <td>{devoir.Devoirs }</td>
                                <td>{devoir.Date_de_devoirs.split('T')[0]}</td>
                                <td>{devoir.Date_de_soumise.split('T')[0]}</td>
                                <td>
                                        <div className="action">
                                            <div className="modifier" onClick={() => handleEdit(devoir.id)}>
                                                <EditIcon/>
                                            </div>
                                            <div className="supprimer" onClick={() => showDeleteConfirmation(devoir.Id_Annonce)}>
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
            {showModal && <ModaleDevoirs onClose={handlehideModal}/>}
            {showModalModif && <ModaleModifDevoir onClose={handelhideEdit}/>}
        </div>
    )
}

export default Professeur_Devoirs;