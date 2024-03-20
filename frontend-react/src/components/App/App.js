// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";
import Admin from "../Admin/Admin";
import FormFilm from "../FormFilm/FormFilm";

import "./App.css";

function App() {
    async function login(e) {
        e.preventDefault();
        const form = e.target;

        const body = {
            courriel: form.courriel.value,
            mdp: form.mdp.value
        }

        console.log(body);

        const data ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify(body),
        }
        const reponse = await fetch("http://localhost:3001/utilisateurs/connexion", data)
        const token = await reponse.json();

        console.log(token)
        if (reponse.status === 200) {
            localStorage.setItem("api-film", token)
            console.log(jetonValide())
        }
        form.reset();

        function jetonValide() {
            try {
                const token = localStorage.getItem("api-film")
                const decoder = jwtDecode(token)

                if (Date.now() < decoder.exp * 1000) {
                    return true
                }else{
                    localStorage.removeItem("api-film")
                    return false
                }
            } catch (erreur) {
                console.log(erreur)
                return false;
            }
        }
    }

    return (
        <Router>
            <Entete handleLogin={login} />
            <Routes>
                <Route>
                    <Route path="/admin" element={<Admin />} ></Route>
                    <Route path="/admin/ajout-film" element={<FormFilm />} ></Route>
                    
                </Route>
                <Route path="/" element={<Accueil />} />
            </Routes>
        </Router>
    );
}

export default App;
