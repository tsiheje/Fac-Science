import React, { useEffect, useState } from "react";
import axios from "axios";

const Reponse = ({ onClose, selectedDevoir }) => {
    const {Id_devoirs} = selectedDevoir || {}
    console.log(Id_devoirs);

    const [reponse, setReponse] = useState([]);
    useEffect (() => {
        const getAllReponse = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/Professeur/reponse/${Id_devoirs}`);
                setReponse(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllReponse();
    }, [])
    return(
        <div className="reponse-anaty">
            <div className="anaty-reponse">
                <h1> LISTE DES REPONSES DU DEVOIR</h1>
                <div className="ferme" onClick={onClose}>X</div>
                <table>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Reponse</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    {reponse.map(reponses => (
                    <tr key={reponses.id}>
                        <td>{reponses.Matricul}</td>
                        <td>{reponses.Nom}</td>
                        <td>{reponses.Prenom}</td>
                        <td>{reponses.Devoirs}</td>
                        <td>{reponses.Date_de_soumission.split('T')[0]}</td>
                    </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Reponse;