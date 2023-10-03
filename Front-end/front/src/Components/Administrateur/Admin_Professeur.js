import React from "react";
import Navbar from '../NavBar/Navbar';
import Card from '../Card/Card';

const Admin_Professeur= () => {
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

export default Admin_Professeur;