import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { NavLink } from "react-router-dom";
import sary from '../src/Assets/Images/cour-cyprien2.jpg'
import { useState } from "react";
import Login from "./Components/Login/Login";
import Compte from './Components/Compte/CompteEtudiant';
import professeur from '../src/Assets/Images/pHlo85Zx20ifuOISOoQCS73g7b9QNiBl0.jpg';
import etudiant from '../src/Assets/Images/pexels-buro-millennial-1438081.jpg';
import icone from '../src/Assets/Images/Book_open_alt@3x.png'

const Etudiant = () => {

    const [showLogin , setshowLogin] = useState(false);
    const handleshowLogin = () => {
        document.body.classList.add('body-no-scroll');
        setshowLogin(true);
    }
    const handleCloseLogin = () => {
        document.body.classList.remove('body-no-scroll');
        setshowLogin(false);
    };

    const [showSignup, setshowSignup] = useState(false);
    const handleshowSignup = () => {
        document.body.classList.add('body-no-scroll');
        setshowSignup(true);
    }
    const handleCloseSignup = () => {
        document.body.classList.remove('body-no-scroll');
        setshowSignup(false);
    }

    return (
        <div className="landing">
            <div className="landing-nav">
                <div className="logo">
                    <h1>One Note</h1>
                </div>
                <div className="lien">
                    <a href='#'>
                        <p>Accueil</p>
                    </a>
                    <a href='#'>
                        <p>A propos</p>
                    </a>
                </div>
                <div className="landing-btn">
                    <div className="inscription" onClick={handleshowSignup}>
                        S'inscrire
                    </div>
                    <div className="separateur">
                        /
                    </div>
                    <div className="connecte" onClick={handleshowLogin}>
                        Se connecter
                    </div>
                </div>
            </div>
            <div className="landing-content">
                <div className="home" id="home">
                    <img src={sary}></img>
                    <div className="kozy">
                        <h1>Bienvenue sur <span>ONE NOTE</span> !</h1>
                        <p>"l'endroit où l'apprentissage rencontre l'innovation. Explorez notre communauté éducative dynamique, découvrez des ressources de qualité et interagissez avec des esprits curieux. Préparez-vous à façonner votre avenir académique."</p>
                    </div>
                </div>
                <div className="About" id="about">
                    <div className="about-service">
                        <div className="text-service">
                            <div className="text-service-kozy">
                                <h1>NOTRE SERVICE</h1>
                            </div>
                            <div className="text-service-phrase">
                                <p>Bienvenue sur One Note, une plateforme éducative novatrice conçue pour améliorer l'expérience d'apprentissage tant pour les étudiants que pour les enseignants. Notre plateforme offre une interface conviviale avec une navigation facile, permettant aux utilisateurs d'accéder à divers menus tels que l'accueil, les annonces, les cours et les devoirs. Dans le menu 'annonces', les enseignants peuvent publier des mises à jour importantes et des informations, tandis que le menu 'cours' offre une plateforme aux enseignants pour publier leurs cours. De plus, le menu 'devoirs' permet aux étudiants d'accéder et de soumettre leurs devoirs. Avec notre plateforme, les ressources sont présentées sous forme de cartes attrayantes, avec la date de publication et le nom de la personne ayant publié les ressources. Rejoignez-nous dans cette excitante aventure de l'éducation et du savoir !</p>
                            </div>
                        </div>
                        <div className="text-professeur">
                            <div className="text-professeur-left">
                                <h3>Large éventail de cours</h3>
                                <p>À One Note, nous proposons une large gamme de cours via notre menu 'Cours'. Nos enseignants expérimentés couvrent une variété de sujets, veillant à ce qu'il y en ait pour tous les goûts. Que vous soyez intéressé par des matières académiques telles que les mathématiques et les sciences, ou que vous souhaitiez explorer des domaines créatifs comme l'art et la musique, nos cours offrent une expérience d'apprentissage complète.En plus de nos cours, nous offrons également une multitude de ressources via notre menu 'Devoirs'. Ces ressources sont conçues pour compléter votre apprentissage et vous aider à exceller dans vos études. Des exercices pratiques aux guides d'étude, nos ressources apportent un soutien précieux pour améliorer votre compréhension des sujets.Explorez nos menus 'Cours' et 'Devoirs' pour découvrir les opportunités éducatives disponibles sur One Note !</p>
                            </div>
                            <div className="text-professeur-right">
                                <img src={professeur}></img>
                            </div>
                        </div>
                        <div className="text-etudiant">
                            <div className="text-etudiant-left">
                                <img src={etudiant}></img>
                            </div>
                            <div className="text-etudiant-right">
                                <h3>Ressources éducatives</h3>
                                <p>Notre menu 'Cours' offre une vaste gamme d'opportunités éducatives pour des étudiants de tous âges. Des matières académiques aux cours axés sur les compétences, nos enseignants sont dédiés à fournir un enseignement de haute qualité qui favorise la croissance et l'apprentissage. Chaque cours est soigneusement conçu pour répondre aux besoins et aux intérêts de nos étudiants, garantissant une expérience éducative enrichissante.En plus de nos cours, nous proposons également une variété de ressources dans notre menu 'Devoirs'. Ces ressources sont créées par nos enseignants et fournissent des matériaux d'apprentissage précieux pour compléter les cours. Qu'il s'agisse de guides d'étude, de quiz pratiques ou d'activités interactives, nos ressources sont conçues pour améliorer le processus d'apprentissage et aider les étudiants à réussir.Explorez nos menus 'Cours' et 'Devoirs' pour découvrir les opportunités éducatives disponibles sur One Note !</p>
                            </div>
                        </div>
                    </div>
                    <h1>Services supplémentaires</h1>
                    <div className="service">
                        <div className="kozy-service">
                            <img src={icone} alt="" />
                            <h2>Planification flexible</h2>
                            <p>Notre menu 'annonces' vous tient informé des dernières actualités et informations de nos enseignants. Des annonces importantes concernant les changements d'emploi du temps et les événements à venir, aux rappels et ressources pour vos cours, vous pouvez trouver toutes les informations dont vous avez besoin en un seul endroit pratique.</p>
                        </div>
                        <div className="kozy-service">
                            <img src={icone} alt="" />
                            <h2>Matériaux d'apprentissage interactifs</h2>
                            <p>Notre menu 'cours' propose une vaste gamme d'opportunités éducatives pour les apprenants de tous âges. Que vous souhaitiez acquérir de nouvelles compétences, approfondir vos connaissances dans un domaine spécifique ou vous préparer à un examen de certification, nos cours ont tout ce qu'il vous faut. Avec des enseignants expérimentés et qualifiés, des supports d'apprentissage interactifs et des options d'emploi du temps flexibles, vous pouvez facilement trouver le cours parfait pour atteindre vos objectifs éducatifs.</p>
                        </div>
                        <div className="kozy-service">
                            <img src={icone} alt="" />
                            <h2>Tutorat personnalisé</h2>
                            <p>Dans le menu 'devoirs', vous découvrirez une variété de tâches et de projets assignés par les enseignants. Ces devoirs sont conçus pour améliorer votre expérience d'apprentissage et vous aider à appliquer les connaissances et compétences acquises dans les cours. Avec des instructions claires, des délais et des directives de soumission, vous pouvez rester organisé et suivre vos progrès à mesure que vous terminez chaque devoir.</p>
                        </div>
                    </div>
                </div>
                <div className="div">
                        <div className="footer">
                            <div className="apropo">
                                <h3><u>A propos</u></h3>
                                <p>la faculté des Sciences est une établissement public de l'universite de Fianarantsoa. Des formations de recherches et professionnelles y sont établies. celles-ci distinguées dans plusieurs mentions et parcours.</p>
                            </div>
                            <div className="contact">
                                <h3><u>Contactez nous</u></h3>
                                <p>Téléphone : <span>034 27 931 75 | 034 46 620 41</span></p>
                                <p>Email : <span>facsciences@gmail.com</span></p>
                            </div>
                            <div className="adresse">
                                <h3><u>Adresse</u></h3>
                                <p>Campus Univesitaire Andrainjato Fianarantsoa </p>
                                <p>BP : <span>1264 - 301 Fianarantsoa</span></p>
                            </div>
                        </div>
                        <p className="copiright">© par RASOLOFONIAINA TSIHEJE Marie Mickaelio, tous droit réservée!</p>
                </div>
                </div>
            {showLogin && <Login onClose={handleCloseLogin} />}
            {showSignup && <Compte onClose={handleCloseSignup}/>}
        </div>
    );
}

export default Etudiant;
