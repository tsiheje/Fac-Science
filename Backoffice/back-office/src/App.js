import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Administrateur from './components/administrateur/Administrateur';
import Admin_Annonce_et_Information from './components/administrateur/Admin_Annonce_et_Information';
import Admin_Professeur from './components/administrateur/Admin_Professeur';
import Admin_Etudiant from './components/administrateur/Admin_Etudiant';
import Admin_parametre from './components/administrateur/Admin_parametre';
import Professeur from './components/professeurs/Professeur';
import Professeur_Annonce_et_Information from './components/professeurs/Professeur_Annonce_et_Information';
import Professeur_Cours from './components/professeurs/Professeur_Cours';
import Professeur_Devoirs from './components/professeurs/Professeur_devoirs';
import Professeur_Notification from './components/professeurs/Professeur_Notification';
import Professeur_Parametre from './components/professeurs/Professeur_Parametre';
import ProtectedRoute from './RouteProteger';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/Professeur" element={<ProtectedRoute element={ <Professeur/>}/>}/>
            <Route path="/Professeur/Annonce_et_Information" element={<ProtectedRoute element={ <Professeur_Annonce_et_Information />} />}/>
            <Route path="/Professeur/Cours" element={<ProtectedRoute element={ <Professeur_Cours/>}/>}/>
            <Route path="/Professeur/Devoirs" element={<ProtectedRoute element={ <Professeur_Devoirs/>}/>}/>
            <Route path="/Professeur/Notification" element={<ProtectedRoute element={ <Professeur_Notification/>}/>}/>
            <Route path="/Professeur/Parametre" element={<ProtectedRoute element={ <Professeur_Parametre/>}/>}/>
            <Route path="/Administrateur" element={<ProtectedRoute element={ <Administrateur/>}/>}/>
            <Route path="/Administrateur/Annonce_et_Information" element={<ProtectedRoute element={ <Admin_Annonce_et_Information />} />}/>
            <Route path="/Administrateur/Professeur" element={<ProtectedRoute element={ <Admin_Professeur/>}/>}/>
            <Route path="/Administrateur/Etudiant" element={<ProtectedRoute element={ <Admin_Etudiant/>}/>}/>
            <Route path="/Administrateur/Parametre" element={<ProtectedRoute element={ <Admin_parametre/>}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
