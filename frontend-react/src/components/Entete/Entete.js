import React from "react";
import { NavLink } from "react-router-dom";
import "./Entete.css";

function Entete({ handleLogin }) {
    //TODO: Ajouter l'état de connexion
    return (
        <header className="pt-medium pb-medium">
            <div className="wrapper">
                <div className="entete">
                    <NavLink to="/">
                        <h1>VideoClub</h1>
                    </NavLink>
                    <div className="entete__right">
                        <nav>
                            <NavLink to="/admin" className={"underline"}>
                                Page privée
                            </NavLink>
                            <NavLink to="/admin/ajout-film" className={"underline"}>
                                Ajouter un film
                            </NavLink>
                        </nav>
                        <form onSubmit={handleLogin}>
                            <input type="text" name="courriel" placeholder="Usager"></input>
                            <input type="password" name="mdp" placeholder="Mot de passe"></input>
                            <button>Connexion</button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Entete;
