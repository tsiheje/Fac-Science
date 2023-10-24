import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import CompteEtudiant from './Components/Compte/CompteEtudiant';
import Etudiant from './Components/Etudiants/Etudiant';
import Cours from './Components/Etudiants/Cours';
import Devoirs from './Components/Etudiants/Devoirs';
import Professeurs from './Components/Etudiants/Professeurs';
import Annonce_et_Information from './Components/Etudiants/Annonce_et_Information';
import Professeur from './Components/Professeurs/Professeur';
import Professeur_Annonce_et_Information from './Components/Professeurs/Professeur_Annonce_et_Information';
import Professeur_Cours from './Components/Professeurs/Professeur_Cours';
import Professeur_Devoirs from './Components/Professeurs/Professeur_devoirs';
import Administrateur from './Components/Administrateurs/Administrateur';
import Admin_Annonce_et_Information from './Components/Administrateurs/Admin_Annonce_et_Information';
import Admin_Professeur from './Components/Administrateurs/Admin_Professeur';
import Admin_Etudiant from './Components/Administrateurs/Admin_Etudiant';
import ProtectedRoute from './RouteProteger';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/CompteEtudiant' element={<CompteEtudiant/>}/>
        <Route path="/Etudiant" element={<ProtectedRoute element={<Etudiant />} />} />
        <Route path="/Etudiant/Annonce_et_Information" element={<ProtectedRoute element={ <Annonce_et_Information />} />} />
        <Route path="/Etudiant/Cours" element={<ProtectedRoute element={ <Cours />}/>} />
        <Route path="/Etudiant/Devoirs" element={<ProtectedRoute element={ <Devoirs />}/>} />
        <Route path="/Etudiant/Professeurs" element={<ProtectedRoute element={ <Professeurs />} /> } />
        <Route path="/Professeur" element={<ProtectedRoute element={ <Professeur/>}/>}/>
        <Route path="/Professeur/Annonce_et_Information" element={<ProtectedRoute element={ <Professeur_Annonce_et_Information />} />}/>
        <Route path="/Professeur/Cours" element={<ProtectedRoute element={ <Professeur_Cours/>}/>}/>
        <Route path="/Professeur/Devoirs" element={<ProtectedRoute element={ <Professeur_Devoirs/>}/>}/>
        <Route path="/Administrateur" element={<ProtectedRoute element={ <Administrateur/>}/>}/>
        <Route path="/Administrateur/Annonce_et_Information" element={<ProtectedRoute element={ <Admin_Annonce_et_Information />} />}/>
        <Route path="/Administrateur/Professeur" element={<ProtectedRoute element={ <Admin_Professeur/>}/>}/>
        <Route path="/Administrateur/Etudiant" element={<ProtectedRoute element={ <Admin_Etudiant/>}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
