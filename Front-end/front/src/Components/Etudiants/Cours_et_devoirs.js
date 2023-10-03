import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import Card from '../Card/Card';


const Cours_et_Devoirs = () => {
    const location = useLocation();
    const user = location.state?.user;
    return(
        <div className="content">
            <Navbar></Navbar>
            <div className="scroll">
            <Card/>
            <Card/>
            </div>
        </div>
    )
}

export default Cours_et_Devoirs;