import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";

import "./App.css";

function App() {
    async function login(e) {
        e.preventDefault();
        const form = e.target;
    }

    return (
        <Router>
            <Entete handleLogin={login} />
            <Routes>
                <Route path="/" element={<Accueil />} />
            </Routes>
        </Router>
    );
}

export default App;
