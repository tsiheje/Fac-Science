import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";

const Notification = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const Niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;
    const Id_compte = decodedToken.Id_compte;

    const [notif, setNotif] = useState([]);
    useEffect (() => {
        const getAllNotif = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/notification/${Id_compte}`);
                setNotif(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getAllNotif();
    }, []);

    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                <div className="notif">
                    <div className="anaty-notif">                        
                        <h1>Mes Notifications</h1>
                        <div className="tab">
                            <table>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {notif.map(notif => (
                                    <tr key={notif.id}>
                                        <td>{notif.Type}</td>
                                        <td>{notif.Contenu}</td>
                                        <td>{notif.Date.split('T')[0]}</td>
                                    </tr>  
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Notification;