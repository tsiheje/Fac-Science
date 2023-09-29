// Layout.js
import React from "react";
import NavBar from "./Components/Etudiants/Navbar";
import Cours_et_Devoirs from "./Components/Etudiants/Cours_et_devoirs";
import Annonces_et_Informations from "./Components/Etudiants/Annonce_et_Information";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "64px" }}>
        {children}
        <Annonces_et_Informations></Annonces_et_Informations>
        {/* <Cours_et_Devoirs></Cours_et_Devoirs> */}
      </div>
    </div>
  );
};

export default Layout;
