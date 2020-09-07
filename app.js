const express = require ('express');
const path = require ("path");  // utilise les fichiers
const mysql = require ("mysql"); // donne accé a la base de donnée
const methodOverride = require ('method-override') // pouvoir transformer le nom des methodes dans Node


//////////////////////////////////////
// rappel pour connection a la base de donner 
require('dotenv').config() // pouvoir utiliser le fichier env qui est un fichier caché "mdp, info connection"

//////////////////////////////////////
// Express - Creer un serveur local - appliquer le crud > permet de creer les methodes get / post / put / delete
const app = express() 

//////////////////////////////////////
//method over  utilisation de la methode
app.use(methodOverride('_method'))



//////////////////////////////////////
// Ejs  moteur de templating sert à compiler les differentes pages et à afficher les donnée de la base de donnée
app.set ('view engine', 'ejs');

//////////////////////////////////////
// Middleware 
app.use(express.json())    // permet à express de lire les fichiers json
app.use(express.urlencoded({extended: false})) // permet à express de lire les info transmise dans l'url 

//////////////////////////////////////
// Static
app.use(express.static(path.join(__dirname, 'public')));  // permet a epress d'utiliser le fichier static ( css, img...)


//////////////////////////////////////////////
// Mysql  // permet de creer la connection base entre la base de donnée et l'appplication
const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL');
});

global.db = db; // donne accés a la connection de l'appli a la base de donnée

const { getCars, getSingleCar, getEditCar, putEditCar, addEditCar }  = require ("./controllers/cars")

app.get("/", getCars)
app.get("/car/:id", getSingleCar)
app.get("/car/edit/:id", getEditCar)
app.put("/car/edit/:id", putEditCar)
app.addListener("/car/edit/:id", addEditCar)

///////////////////////////////////////////
// port utilisé par express en serveur local
app.listen(3000, function() {
    console.log('le serveur ecoute le port 3000');
})

