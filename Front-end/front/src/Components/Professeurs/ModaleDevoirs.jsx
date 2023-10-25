import React from "react";

const ModaleDevoirs = ({onClose}) => {
    return(
        <div className="Modal">
            <div>
                <div className="fermer" onClick={onClose}>X</div>
                <div className="Titre">
                    <h2>DONNER UN DEVOIR</h2>
                </div>
                <div className="formulaire"></div>
            </div>
        </div>
    )
}

export default ModaleDevoirs;