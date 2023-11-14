import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import profil from '../../Assets/Images/3135715.png';
import fleche from '../../Assets/Images/fleche-vers-le-bas.png';
import logout from '../../Assets/Images/logout.svg';
import setting from '../../Assets/Images/icons8-paramètres-64.svg';
import message from '../../Assets/Images/message.svg';
import notification from '../../Assets/Images/notifications-active.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import './Professeur.css';

const BarNav = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);

    const prenom = decodedToken.Prenom;
    const [logoutAlert, setLogoutAlert] = useState(false);

      const handleDeconnexion = () => {
        Swal.fire({
            title: "Voulez-vous vraiment vous déconnecter ?",
            text: "Cliquez sur OK pour vous déconnecter.",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove('token');
                window.location.href = '/';
            }
            
        });
    };
    return(
        <div className='barnav'>
            <div className="profil">
                <img src={profil} width="20%" style={{ borderRadius: '50%' }} alt="Profil" />
                <p>Pr. {prenom}</p>
            </div>
            <div className="link">
                        <NavLink to="/Professeur">
                            <img src={setting} width="10%" alt="Profil" />
                            <p>Dashbord</p>
                        </NavLink>
                        <NavLink to="/Professeur/Annonce_et_Information">
                            <img src={setting} width="10%" alt="Profil" />
                            <p>Annonces</p>
                        </NavLink>
                        <NavLink to="/Professeur/cours">
                            <img src={setting} width="10%" alt="Profil" />
                            <p>Cours</p>
                        </NavLink>
                        <NavLink to="/Professeur/devoirs">
                            <img src={setting} width="10%" alt="Profil" />
                            <p>Devoirs</p>
                        </NavLink>
                        <NavLink to="/Professeur/Parametre">
                            <img src={setting} width="10%" alt="Profil" />
                            <p>Paramètres</p>
                        </NavLink>
                        <NavLink to="/Professeur/Notification">
                            <img src={notification} width="10%" alt="Profil" />
                            <p>Notifications</p>
                        </NavLink>
                        <NavLink to="/Professeur/Message">
                            <img src={message} width="10%" alt="Profil" />
                            <p>Messages</p>
                        </NavLink>
                </div>
            <div className="logout" onClick={handleDeconnexion}>
                <img src={logout} width="25%" style={{ borderRadius: '50%' }} alt="Profil" />
                <p>Se déconneter</p>
            </div>
        </div>
    )
}

export default BarNav;