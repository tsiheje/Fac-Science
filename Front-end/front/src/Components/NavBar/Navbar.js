import { NavLink, useLocation } from "react-router-dom";
import './Navbar.css';
import profil from '../../Asset/Images/3135715.png';

const NavBar = () => {
    const location = useLocation();
    const user = location.state?.user;
    const role = user?.Roles;
   
    return(
        <div className="navbar">
            <h2> One Note</h2>
            
            {role === "Etudiant" && (
                    <div className="link">
                        <NavLink to="/Etudiant">
                            <p>Annonce et information</p>
                        </NavLink>
                        <NavLink to="/Etudiant/Cours_et_devoirs">
                            <p>Cours et Devoir</p>
                        </NavLink>
                        <div className="profil">
                            <img src={profil} width="100%" border-radius="50%"></img>
                        </div>
                    </div>
                )
            }

            {role === "Professeur" && (
                console.log(role),
                    <div className="link">
                        <NavLink to="/Professeur">
                            <p>Annonce et information</p>
                        </NavLink>
                        <NavLink to="/Professeur/Cours_et_devoirs">
                            <p>Cours et Devoir</p>
                        </NavLink>
                        <div className="profil">
                            <img src={profil} width="100%" border-radius="50%"></img>
                        </div>
                    </div>
                )
            }

            {role === "Administrateur" && (
                console.log(role),
                    <div className="link">
                        <NavLink to="/Administrateur">
                            <p>Annonce et information</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Professeur">
                            <p>Professeur</p>
                        </NavLink>
                        <NavLink to="/Administrateur/Etudiant">
                            <p>Etudiant</p>
                        </NavLink>
                        <div className="profil">
                            <img src={profil} width="100%" border-radius="50%"></img>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default NavBar;