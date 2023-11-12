import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import CompteEtudiant from './Components/Compte/CompteEtudiant';
import Cours from './Components/Etudiants/Cours';
import Devoirs from './Components/Etudiants/Devoirs';
import Professeurs from './Components/Etudiants/Professeurs';
import Annonce_et_Information from './Components/Etudiants/Annonce_et_Information';
import ProtectedRoute from './RouteProteger';
import Message from './Components/Etudiants/Message';
import Notification from './Components/Etudiants/Notification';
import Paremetre from './Components/Etudiants/Parametre';
import Etudiant from './Etudiant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Etudiant/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path='/CompteEtudiant' element={<CompteEtudiant/>}/>
        <Route path="/Annonce_et_Information" element={<ProtectedRoute element={ <Annonce_et_Information />} />} />
        <Route path="/Cours" element={<ProtectedRoute element={ <Cours />}/>} />
        <Route path="/Devoirs" element={<ProtectedRoute element={ <Devoirs />}/>} />
        <Route path="/Professeurs" element={<ProtectedRoute element={ <Professeurs />} /> } />
        <Route path="/Message" element={<ProtectedRoute element={ <Message />} /> } />
        <Route path="/Notification" element={<ProtectedRoute element={ <Notification />} /> } />
        <Route path="/Parametre" element={<ProtectedRoute element={ <Paremetre />} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
