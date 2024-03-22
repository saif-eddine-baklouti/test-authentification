import { useState } from "react"
import "./FormFilm.css";
import { useNavigate } from "react-router-dom";



function FormFilm() {

    const navigate = useNavigate();   
    const genres = ["Action","Aventure","Comédie","Drame","Fantaisie","Horreur","Policier","Science-fiction","Thriller","Western"]
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
        const {name, value} = e.target
        
        if (name.startsWith("genre")) {
            console.log("yess checked");
            const estCoched = e.target.checked;
            let genres = formData.genres || [];
            // si on decoche, on enleve

            if (!estCoched && genres.includes(value)) {
                genres = genres.filter( (el) =>{
                    return el !== value
                })
            } else if (estCoched && !genres.includes(value)) {
                genres.push(value);
            }

            const donneeModifiee = {...formData, genres:genres};
            setFormData(donneeModifiee);

        } else if (name === "titreVignette") {
            
            const nomFichier = e.target.files[0].name
            const donneeModifiee = {...formData, "titreVignette":nomFichier};
            setFormData(donneeModifiee);

        } else {
            
            const donneeModifiee = {...formData, [name]:value};
            setFormData(donneeModifiee);
            const estValide = e.target.form.checkValidity() ? "valid" : "invalid"
            setFormValidity(estValide)
        }
        


        
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

            // navigate("/");
        } else {
            const messageErreur = response.error;
            console.log("erreur", messageErreur)
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
                    <div className="input-group" >
                        <p>Genres</p>
                        {genres.map( (el , i) => {
                            return (
                                <div key={i} > 
                                <input type="checkbox" name={`genre-${el}`} id={el} value={el} onChange={onFormDataChange} checked={formData.genres.includes(el)} /> 
                                <label htmlFor={el}> {el} </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="input-group" >
                        <input type="file" name="titreVignette" id="titreVignette" accept=".jpg,.jpeg,.png,.webp" onChange={onFormDataChange} />
                        <label htmlFor="titreVignette"> Vignette</label>
                    </div>
                    <input type="submit" value="Envoyer" disabled={formValidity === "invalid" ? "disabled" : ""}/>
                </form>

            </div>
        </main>
    )
}

export default FormFilm