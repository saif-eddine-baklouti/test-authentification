const jwt = require("jsonwebtoken");
const db = require("../config/db")

const auth = async (req,res,next) => {
try {// si le jwt est valide 
// est ce qu'il y quelque chose dans l'entete
    if (req.headers.authorization) {
        // transforme en array et retourne la portion apres Bearer
        // Exemple d'auth: Bearer lfdshkfhskjdgfh.gfdfdg.gfdgfd
        const jetonAvalider = req.headers.authorization.split(" ")[1];
        const jetonDecode = jwt.verify(jetonAvalider, process.env.JWT_SECRET);

        const utilisateurVerifie = await db.collection("utilisateurs").doc(jetonDecode.id).get();

        if (utilisateurVerifie.exists) {
            const utilisateurRecupere = utilisateurVerifie.data();
            req.utilisateur = utilisateurRecupere

            // Appelle le suite de la requete initiale
            next();
        } else {
            // si l'utilisateur n'exists pas , returne erreur non autorisée
            // res.statusCode = 401;
            // res.json({ message: "Non autororisé"})

            throw new Error("Non autorisé")
        }
    }else{
        res.statusCode = 401;
        res.json({ message: "Non autorisé"})
    }} catch (erreur) {
        console.log(erreur)
        res.statusCode = 401;
        res.json({ message: erreur.message })
    }
}

module.exports = auth;