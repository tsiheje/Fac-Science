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
import Annonces_et_Informations from './Components/Etudiants/Annonce_et_Information';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/CompteEtudiant' element={<SignInSide/>}/>
        <Route path="/CompteEnseignant" element={<CompteEnseignant />} />
        <Route path="/Etudiant"element={<Etudiant />}>
          <Route path="Cours_et_devoirs" element={<Cours_et_Devoirs />} />
          <Route path="Annonces_et_Informations" element={<Annonces_et_Informations />}/>
        </Route>
        <Route path="/Professeur" element={<Professeur/>}/>
        <Route path="/Administrateur" element={<Administrateur/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
