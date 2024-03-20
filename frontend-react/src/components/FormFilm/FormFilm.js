import { useState } from "react"
import "./FormFilm.css";

function FormFilm() {
    
    const [formData, setFormData] = useState({
        titre:"",
        description:"",
        realisation:"",
        annee:"",
        genres: [],
        titreVignette:"Vide.jpg"
    })

    const [formValidity, setFormValidity] = useState("invalid")

    function onFormDataChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);

        const {name, value} = e.target

        const donneeModifiee = {...formData, [name]:value};
        setFormData(donneeModifiee);

        const estValide = e.target.form.checkValidity() ? "valid" : "invalid"
        setFormValidity(estValide)

        console.log(formData)
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        // Varification front-end
        if (formValidity === "invalid") {
            //Afficher un message d'erreur
            e.target.reportValidity();
            return;
        }

        // Prépare la donnée 
        const data = {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("api-film")}`
            },
            body: JSON.stringify(formData),
        };

        // On récupere la token

        // on soumet
        const request = await fetch("http://localhost:3001/films", data)
        const response = await request.json();

        // on gére la réponse de formulaire
        if (request.status === 200) {
            // afficher un message de succés
            console.log("super")
            //Vide le formulaire
            setFormData({
                titre:"",
                description:"",
                realisation:"",
                annee:"",
                genres: [],
                titreVignette:"Vide.jpg"
            })
            //Reinit l'état de validité
            setFormValidity("invalid") 
        } else {
            const messageErreur = response.error;
            // console.log("erreur", messageErreur)
        }
    }

    return (
        <main>
            <div className="wrapper">
                <h1>Ajouter un film</h1>
                <form className={formValidity} onSubmit={onFormSubmit}>
                    <div className="input-group">
                        <label htmlFor="titre">Titre</label>
                        <input type="text" name="titre" id="titre" value={formData.titre} onChange={onFormDataChange} required minLength={1} maxLength={150}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" name="description" id="description" value={formData.description} onChange={onFormDataChange} required minLength={1} maxLength={255}></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="realisation">Realisation</label>
                        <input type="text" name="realisation" id="realisation" value={formData.realisation} onChange={onFormDataChange} required minLength={1} maxLength={150} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="annee">Annee</label>
                        <input type="text" name="annee" id="annee" value={formData.annee} onChange={onFormDataChange} required minLength={1} maxLength={150} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="titreVignette"> Titre Vignette</label>
                        <input type="text" name="titreVignette" id="titreVignette" value={formData.titreVignette} onChange={onFormDataChange} minLength={1} maxLength={150}/>
                    </div>
                    <input type="submit" value="Envoyer" disabled={formValidity === "invalid" ? "disabled" : ""}/>
                </form>

            </div>
        </main>
    )
}

export default FormFilm