import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import CompteEnseignant from './Components/Comptes/CompteEnseignant';
import Etudiant from './Components/Etudiants/Etudiant';
import Professeur from './Components/Professeurs/Professeur';
import Administrateur from './Components/Administrateur/Administrateur';
import React, {useState} from 'react';
import SignInSide from './Components/Comptes/CompteEtudiant';
import Cours_et_Devoirs from './Components/Etudiants/Cours_et_devoirs';
import Professeur_Cours_et_Devoirs from './Components/Professeurs/Professeur_Cours_et_devoirs';
import Admin_Professeur from './Components/Administrateur/Admin_Professeur';
import Admin_Etudiant from './Components/Administrateur/Admin_Etudiant';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Lorsque l'utilisateur se connecte avec succès
  const handleUserLogin = (userData) => {
    setUser(userData);
    setUserRole(userData.Roles);
  }
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login onLogin={handleUserLogin} />} />
        <Route path='/CompteEtudiant' element={<SignInSide/>}/>
        <Route path="/CompteEnseignant" element={<CompteEnseignant />} />
        <Route path="/Etudiant"element={<Etudiant />}></Route>
        <Route path="/Etudiant/Cours_et_devoirs" element={<Cours_et_Devoirs />} />
        <Route path="/Professeur" element={<Professeur/>}/>
        <Route path="/Professeur/Cours_et_devoirs" element={<Professeur_Cours_et_Devoirs/>}/>
        <Route path="/Administrateur" element={<Administrateur/>}/>
        <Route path="/Administrateur/Professeur" element={<Admin_Professeur/>}/>
        <Route path="/Administrateur/Etudiant" element={<Admin_Etudiant/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
