import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
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
import './NavBar.css';

const NavBar = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const role = decodedToken.Roles

    const [anchorEl, setAnchorEl] = useState(null);
    const [logoutAlert, setLogoutAlert] = useState(false);

      const handleDeconnexion = () => {
        handleMenuClose();
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

    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
      };

    return(
        <div className="navbar">
            <h2>One Note</h2>
            {/* <div className="recherche">
                <input type="search" name="recherche" id="recherche" placeholder="rechercher votre besoin..."/>
                <div className="search-icon"></div>
            </div> */}
            <div className="link">
                <NavLink to="/Annonce_et_Information">
                    <p>Annonce</p>
                </NavLink>
                <NavLink to="/Cours">
                    <p>Cours</p>
                </NavLink>
                <NavLink to="/Devoirs">
                    <p>Devoirs</p>
                </NavLink>
                <NavLink to="/Professeurs">
                    <p>Professeurs</p>
                </NavLink>
            </div>
            <div className="sary">
                <div className="profil" onClick={handleMenuOpen}>
                    <img src={profil} width="100%" style={{ borderRadius: '50%' }} alt="Profil" /><img src={fleche} width="30%" height="15px" style={{ margintop: '50px' }}/>
                </div>
                {menuOpen && (
                    <div className="menu">
                        <NavLink to="/Parametre">
                            <img src={setting} alt="" width={'15%'}/>
                            <p>Parametres</p>
                        </NavLink>
                        <NavLink to="/Notification">
                            <img src={notification} alt="" width={'15%'}/>
                            <p>Notifications</p>
                        </NavLink>
                        {/* <NavLink to="/Message">
                            <img src={message} alt="" width={'15%'}/>
                            <p>Messages</p>
                        </NavLink> */}
                        <div className="deconnexion" onClick={handleDeconnexion}>
                            <img src={logout} alt="" width={'15%'}/>
                            Se déconnecter
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar;