import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";

const Paremetre = () => {
    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                <div className="left">

                </div>
                <div className="gauche">
                    
                </div>
            </div>
        </div>
    )
}

export default Paremetre;