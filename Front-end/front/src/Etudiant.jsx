import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { NavLink } from "react-router-dom";
import sary from '../src/Assets/Images/pexels-yan-krukau-8199555.jpg'
import { useState } from "react";
import Login from "./Components/Login/Login";

const Etudiant = () => {

    const [showLogin , setshowLogin] = useState(false);
    const handleshowLogin = () => {
        setshowLogin(true);
    }
    const handleCloseLogin = () => {
        setshowLogin(false);
    };

    const [showSignup, setshowSignup] = useState(false);
    const handleshowSignup = () => {
        setshowSignup(true);
    }
    const handleCloseSignup = () => {
        setshowSignup(false);
    }

    return (
        <div className="content">
            <div className="logo">
                <h2>One Note</h2>
            </div>
            <div className="lien">
                <NavLink>
                    <p>Accueil</p>
                </NavLink>
                <NavLink>
                    <p>A propos</p>
                </NavLink>
                <NavLink>
                    <p>Contact</p>
                </NavLink>
                <div className="inscription" onClick={handleshowSignup}>
                    S'inscrire
                </div>
                <div className="connecte" onClick={handleshowLogin}>
                    Se connecter
                </div>
                {showLogin && <Login onClose={handleCloseLogin} />}
            </div>
            <div className="home" id="home">
                <div className="sary">
                    <img src={sary}></img>
                </div>
                <div className="kozy">
                    <h1>Bienvenue sur <span>ONE NOTE</span></h1>
                    <p>"l'endroit où l'apprentissage rencontre l'innovation. Explorez notre communauté éducative dynamique, découvrez des ressources de qualité et interagissez avec des esprits curieux. Préparez-vous à façonner votre avenir académique."</p>
                </div>
            </div>
            <div className="About" id="about">
                <p>Bienvenue sur One Note, une plateforme éducative novatrice conçue pour améliorer l'expérience d'apprentissage tant pour les étudiants que pour les enseignants. Notre plateforme offre une interface conviviale avec une navigation facile, permettant aux utilisateurs d'accéder à divers menus tels que l'accueil, les annonces, les cours et les devoirs. Dans le menu 'annonces', les enseignants peuvent publier des mises à jour importantes et des informations, tandis que le menu 'cours' offre une plateforme aux enseignants pour publier leurs cours. De plus, le menu 'devoirs' permet aux étudiants d'accéder et de soumettre leurs devoirs. Avec notre plateforme, les ressources sont présentées sous forme de cartes attrayantes, avec la date de publication et le nom de la personne ayant publié les ressources. Rejoignez-nous dans cette excitante aventure de l'éducation et du savoir !</p>
            </div>
            <div className="" >
                <p>À One Note, nous proposons une large gamme de cours via notre menu 'Cours'. Nos enseignants expérimentés couvrent une variété de sujets, veillant à ce qu'il y en ait pour tous les goûts. Que vous soyez intéressé par des matières académiques telles que les mathématiques et les sciences, ou que vous souhaitiez explorer des domaines créatifs comme l'art et la musique, nos cours offrent une expérience d'apprentissage complète.En plus de nos cours, nous offrons également une multitude de ressources via notre menu 'Devoirs'. Ces ressources sont conçues pour compléter votre apprentissage et vous aider à exceller dans vos études. Des exercices pratiques aux guides d'étude, nos ressources apportent un soutien précieux pour améliorer votre compréhension des sujets.Explorez nos menus 'Cours' et 'Devoirs' pour découvrir les opportunités éducatives disponibles sur One Note !</p>
            </div>
            <div className="c">
                <p>Notre menu 'Cours' offre une vaste gamme d'opportunités éducatives pour des étudiants de tous âges. Des matières académiques aux cours axés sur les compétences, nos enseignants sont dédiés à fournir un enseignement de haute qualité qui favorise la croissance et l'apprentissage. Chaque cours est soigneusement conçu pour répondre aux besoins et aux intérêts de nos étudiants, garantissant une expérience éducative enrichissante.En plus de nos cours, nous proposons également une variété de ressources dans notre menu 'Devoirs'. Ces ressources sont créées par nos enseignants et fournissent des matériaux d'apprentissage précieux pour compléter les cours. Qu'il s'agisse de guides d'étude, de quiz pratiques ou d'activités interactives, nos ressources sont conçues pour améliorer le processus d'apprentissage et aider les étudiants à réussir.Explorez nos menus 'Cours' et 'Devoirs' pour découvrir les opportunités éducatives disponibles sur One Note !</p>
            </div>
            <div className="add">
                <p>Flexible Scheduling</p>
                <p>Notre menu 'annonces' vous tient informé des dernières actualités et informations de nos enseignants. Des annonces importantes concernant les changements d'emploi du temps et les événements à venir, aux rappels et ressources pour vos cours, vous pouvez trouver toutes les informations dont vous avez besoin en un seul endroit pratique.</p>
            </div>
            <div className="ad">
                <p>Interactive Learning Materials</p>
                <p>Notre menu 'cours' propose une vaste gamme d'opportunités éducatives pour les apprenants de tous âges. Que vous souhaitiez acquérir de nouvelles compétences, approfondir vos connaissances dans un domaine spécifique ou vous préparer à un examen de certification, nos cours ont tout ce qu'il vous faut. Avec des enseignants expérimentés et qualifiés, des supports d'apprentissage interactifs et des options d'emploi du temps flexibles, vous pouvez facilement trouver le cours parfait pour atteindre vos objectifs éducatifs.</p>
            </div>
            <div className="a">
                <p>Personalized Tutoring</p>
                <p>Dans le menu 'devoirs', vous découvrirez une variété de tâches et de projets assignés par les enseignants. Ces devoirs sont conçus pour améliorer votre expérience d'apprentissage et vous aider à appliquer les connaissances et compétences acquises dans les cours. Avec des instructions claires, des délais et des directives de soumission, vous pouvez rester organisé et suivre vos progrès à mesure que vous terminez chaque devoir.</p>
            </div>
        </div>
    );
}

export default Etudiant;
