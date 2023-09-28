import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import CompteEnseignant from './Components/Comptes/CompteEnseignant';
import Etudiant from './Components/Etudiants/Etudiant';
import Professeur from './Components/Professeurs/Professeur';
import Administrateur from './Components/Administrateur/Administrateur';
import { ProtectedRoute } from './Securisation';
import React, {useState} from 'react';
import SignInSide from './Components/Comptes/CompteEtudiant';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/CompteEtudiant' element={<SignInSide/>}/>
        <Route path="/CompteEnseignant" element={<CompteEnseignant />} />
        <Route path="/Etudiant"element={<Etudiant />}/>
        <Route path="/Professeur" element={<Professeur/>}/>
        <Route path="/Administrateur" element={<Administrateur/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
