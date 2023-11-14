import React from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './Professeur.css';
import BarNav from "./Navbar";

const Professeur = () =>{
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);

    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compents">
                
            </div> 
        </div>
    )
}

export default Professeur;