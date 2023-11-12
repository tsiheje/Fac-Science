import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";

const Notification = () => {
    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                <div className="notif">
                    <div className="anaty-notif">
                        <p>Mes Notifications</p>
                        <div className="filtre">
                            <div className="tous">
                                tous
                            </div>
                            <div className="annonce">
                                Annonces
                            </div>
                            <div className="cours">
                                Cours
                            </div>
                            <div className="devoirs">
                                Devoirs
                            </div>
                            <div className="message">
                                Messages
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Notification;