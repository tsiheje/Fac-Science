import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import profil from '../../Assets/Images/3135715.png';
import fleche from '../../Assets/Images/fleche-vers-le-bas.png';
import logout from '../../Assets/Images/logout.svg';
import setting from '../../Assets/Images/icons8-paramètres-64.svg';
import personne from '../../Assets/Images/User_fill@3x.png';
import notification from '../../Assets/Images/notifications-active.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import './Administrateur';
import dashbord from '../../Assets/Images/dashboard.svg';
import annonce from '../../Assets/Images/announcement.svg';
import image from '../../Assets/Images/image.svg'

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
                <p>{prenom}</p>
            </div>
            <div className="link">
                        <NavLink to="/Administrateur">
                            <img src={dashbord} width="10%" alt="Profil" />
                            <p>Dashbord</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Annonce_et_Information">
                            <img src={annonce} width="10%" alt="Profil" />
                            <p>Annonces</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Professeur">
                            <img src={personne} width="10%" alt="Profil" />
                            <p>Professeurs</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Etudiant">
                            <img src={personne} width="10%" alt="Profil" />
                            <p>Etudiants</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Parametre">
                            <img src={setting} width="10%" alt="Profil" />
                            <p>Paramètres</p>
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