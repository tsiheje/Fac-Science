import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import { jwtDecode } from "jwt-decode";

const Professeur_Parametre = () => {
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
                
            </div>
        </div>
    )
}

export default Professeur_Parametre;