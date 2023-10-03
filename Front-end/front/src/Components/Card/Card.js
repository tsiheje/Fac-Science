import React from "react";
import './Card.css';
import sty from '../../Asset/Images/images.jpg';
import profil from '../../Asset/Images/3135715.png';

const Card = () => {
    return(
        <div className="card">
            <div className="prof">
                <div className="profil">
                    <img src={profil} width="100%" border-radius="50%"></img>
                </div>
                <div className="info">
                    <h2>Pr Marie Mickaelio</h2>
                    <p>INFORMATIQUE</p>
                </div>
            </div>
            <div className="descri">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corporis dolores laborum minus magnam animi esse voluptas, obcaecati id tempore laboriosam incidunt dicta commodi velit ea optio voluptate? Voluptas, a?</p>
            </div>
            <div className="img">
                <img src={sty} width="100%" height="80%">
                </img>
            </div>
            <div className="action">
                <p className="show">Regarder</p>
                <p>Telecharger</p>
            </div>
        </div>
    )
}
export default Card;