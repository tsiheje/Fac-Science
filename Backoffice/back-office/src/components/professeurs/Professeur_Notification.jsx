import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import { jwtDecode } from "jwt-decode";
import './Professeur.css';

const Professeur_Notification = () => {
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compents">
                <div className="compents-content">
                    <h1>MES NOTIFICATIONS</h1>
                </div>
            </div>
        </div>
    )
}

export default Professeur_Notification;