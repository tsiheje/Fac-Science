import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import CompteEtudiant from './Components/Comptes/CompteEtudiant';
import CompteEnseignant from './Components/Comptes/CompteEnseignant';
import Etudiant from './Components/Etudiants/Etudiant'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CompteEtudiant" element={<CompteEtudiant />} />
        <Route path="/CompteEnseignant" element={<CompteEnseignant />} />
        <Route path="/Etudiant" element={<Etudiant/>}/>
        {/* Autres routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
