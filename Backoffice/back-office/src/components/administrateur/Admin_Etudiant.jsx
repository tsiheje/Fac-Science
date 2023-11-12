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

    return (
        <div className="content">
            <BarNav />
            <div className="scroll">
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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                        {etudiants.map(etudiant => (
                    <div className="card-professeur"key={etudiant.id} >
                            <div className="anatiny-professeur" >
                            <div className="left">
                                <img src={sary} width="100%" height="80%" alt="Image de l'étudiant" />
                            </div>
                            <div className="right">
                                <p>Nom : {etudiant.Nom}</p>
                                <p>Prenom : {etudiant.Prenom}</p>
                                <p>Matricul : {etudiant.Matricul}</p>
                                <p>Niveau : {etudiant.Niveau}</p>
                                <p>Mention : {etudiant.Mention}</p>
                                <p>Parcours : {etudiant.Parcours}</p>
                                <p>Telephone : {etudiant.Telephone}</p>
                                <p>Email : {etudiant.Email}</p>
                            </div>
                        </div>
                        <div className="action">
                            <div className="modifier"><EditIcon/></div>
                            <div className="supprimer"><DeleteIcon/></div>
                            <div className="message"><ChatBubbleIcon/></div>
                        </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Admin_Etudiant;
