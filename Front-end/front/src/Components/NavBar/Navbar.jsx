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

const NavBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };
    const token = Cookies.get('token');
    console.log(token);

    const decodedToken = jwt_decode(token);
    console.log(decodedToken.Roles);

    const role = decodedToken.Roles

    const [anchorEl, setAnchorEl] = useState(null);
    const [logoutAlert, setLogoutAlert] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleMenuClose = () => {
        setAnchorEl(null);
      };

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
      
    
    return(
        <div className="navbar">
            <h2>One Note</h2>
            <div className="searchbar">
                <input
                    type="text"
                    name="search"
                    placeholder="Rechercher..."
                    className="search-input"
                />
                <SearchIcon className="search-icon" />
            </div>
            {role === "Etudiant" && (
                    <div className="link">
                        <NavLink to="/Etudiant">
                            <p>Acceuil</p>
                        </NavLink>
                        <NavLink to="/Etudiant/Annonce_et_Information">
                            <p>Annonce et information</p>
                        </NavLink>
                        <NavLink to="/Etudiant/Cours">
                            <p>Cours</p>
                        </NavLink>
                        <NavLink to="/Etudiant/Devoirs">
                            <p>Devoirs</p>
                        </NavLink>
                        <NavLink to="/Etudiant/Professeurs">
                            <p>Professeurs</p>
                        </NavLink>
                        <div className="profil" onClick={handleMenuOpen}>
                            <img src={profil} width="100%" style={{ borderRadius: '50%' }} alt="Profil" /><img src={fleche} width="30%" height="15px" style={{ margintop: '50px' }}/>
                        </div>
                        <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                keepMounted
                                >
                            <MenuItem onClick={handleMenuClose}><img src={setting} width="10%" alt="Profil" />Paramètres</MenuItem>
                            <MenuItem onClick={handleMenuClose}><img src={notification} width="10%" alt="Profil" />Notifications</MenuItem>
                            <MenuItem onClick={handleMenuClose}><img src={message} width="10%" alt="Profil" />Messages</MenuItem>
                            <MenuItem onClick={handleDeconnexion}><img src={logout} width="10%" alt="Profil" />Déconnexion</MenuItem>
                        </Menu>
                    </div>
                )
            }

            {role === "Professeur" && (
                console.log(role),
                    <div className="link">
                        <NavLink to="/Professeur">
                            <p>Acceuil</p>
                        </NavLink>
                        <NavLink to="/Professeur/Annonce_et_Information">
                            <p>Annonce et information</p>
                        </NavLink>
                        <NavLink to="/Professeur/Cours">
                            <p>Cours</p>
                        </NavLink>
                        <NavLink to="/Professeur/Devoirs">
                            <p>Devoirs</p>
                        </NavLink>
                        <div className="profil" onClick={handleMenuOpen}>
                            <img src={profil} width="100%" style={{ borderRadius: '50%' }} alt="Profil" /><img src={fleche} width="30%" height="15px" style={{ margintop: '50px' }}/>
                        </div>
                        <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                keepMounted
                                >
                            <MenuItem onClick={handleMenuClose}><img src={setting} width="10%" alt="Profil" />Paramètres</MenuItem>
                            <MenuItem onClick={handleMenuClose}><img src={notification} width="10%" alt="Profil" />Notifications</MenuItem>
                            <MenuItem onClick={handleMenuClose}><img src={message} width="10%" alt="Profil" />Messages</MenuItem>
                            <MenuItem onClick={handleDeconnexion}><img src={logout} width="10%" alt="Profil" />Déconnexion</MenuItem>
                        </Menu>
                    </div>
                )
            }

            {role === "Administrateur" && (
                console.log(role),
                    <div className="link">
                        <NavLink to="/Administrateur">
                            <p>Dashbord</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Annonce_et_Information">
                            <p>Annonce et information</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Professeur">
                            <p>Professeur</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Etudiant">
                            <p>Etudiant</p>
                        </NavLink>
                        <div className="profil" onClick={handleMenuOpen}>
                            <img src={profil} width="100%" style={{ borderRadius: '50%' }} alt="Profil" /><img src={fleche} width="30%" height="15px" style={{ margintop: '50px' }}/>
                        </div>
                        <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                keepMounted
                                >
                            <MenuItem onClick={handleMenuClose}><img src={setting} width="10%" alt="Profil" />Paramètres</MenuItem>
                            <MenuItem onClick={handleMenuClose}><img src={notification} width="10%" alt="Profil" />Notifications</MenuItem>
                            <MenuItem onClick={handleMenuClose}><img src={message} width="10%" alt="Profil" />Messages</MenuItem>
                            <MenuItem onClick={handleDeconnexion}><img src={logout} width="10%" alt="Profil" />Déconnexion</MenuItem>
                        </Menu>
                    </div>
                )
            }   
        </div>
    )
}

export default NavBar;