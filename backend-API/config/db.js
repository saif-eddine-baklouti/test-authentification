var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter } = require("firebase-admin/firestore");
const firebaseConfig = require("../db-config.json");

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
});
const db = getFirestore();

module.exports = db;
