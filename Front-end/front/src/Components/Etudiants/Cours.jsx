import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import { containerClasses } from "@mui/system";

const Cours = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const Niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;

    const [cours, setCours] = useState([]);
    useEffect (() => {
        const getAllCours = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/cours/${Niveau}/${Mention}/${Parcours}`);
                setCours(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getAllCours();
    }, []);
    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                <div className="card-etudiant">
                    <div className="anatiny-etudiant">
                        
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Cours;