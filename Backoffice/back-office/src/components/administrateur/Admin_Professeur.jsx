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

    return(
        <div className="content">
            <BarNav/>
            <div className="scroll">
                <div className="buttonajouter" onClick={handleshowModal}>
                    Ajouter Un(e) Professeur
                </div>
                {showModal && <ModalProfesseur onClose={handleCloseModal}/>}
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
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
                    </tr>
                </table>
                {Professeur.map(Professeurs => (
                <div className="card-prof"key={Professeurs.id}>
                    <div className="anatiny-prof">
                        <div className="left">
                            <img src={sary} width="100%" height="100%">
                                </img>
                        </div>
                        <div className="right">
                            <p className="Nom">{Professeurs.Nom} {Professeurs.Prenom}</p>
                            <div className="tel">
                                {/* <img src={tel}></img> :  */}
                                <p>{Professeurs.Telephone}</p>  
                            </div>
                            <div className="mail">
                                {/* <img src={mail}></img> :  */}
                                <p>{Professeurs.Email}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="action">
                            <div className="supprimer"><DeleteIcon/></div>
                            <div className="message"><ChatBubbleIcon/></div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Admin_Professeur;