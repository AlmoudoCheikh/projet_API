// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importer les modules nécessaires
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./backend/database');  // Si tu as un fichier de connexion à la DB

// // Importer les routes de l'API

const depensesRoutes = require('./backend/routes/depenses');
const revenusRoutes = require('./backend/routes/revenus');
const soldeRoutes = require('./backend/routes/solde').router;

// const depensesRoutes = require('./backend/routes/depenses');
// const revenusRoutes = require('./backend/routes/revenus');
// const soldeRoutes = require('./backend/routes/solde').router;
// const updateSolde = require('./backend/routes/solde').updateSolde;

// Initialiser l'application Express
const app = express();
app.use(cors());
app.use(express.json());  // Middleware pour gérer les requêtes JSON

// Utilisation des routes
app.use('/depenses', depensesRoutes);
app.use('/revenus', revenusRoutes);
app.use('/solde', soldeRoutes);

// Mise à jour du solde après chaque ajout, modification ou suppression de dépense/revenu
app.post('/depenses', (req, res, next) => {
    next();
    updateSolde();
});
app.post('/revenus', (req, res, next) => {
    next();
    updateSolde();
});

app.put('/depense/:id', (req, res, next) => {
    next();
    updateSolde();
});

app.put('/revenus/:id', (req, res, next) => {
    next();
    updateSolde();
});

app.delete('/depenses/:id', (req, res, next) => {
    next();
    updateSolde();
});

app.delete('/revenus/:id', (req, res, next) => {
    next();
    updateSolde();
});

// Lancer le serveur sur le port défini dans le fichier .env ou par défaut sur 5000
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
});


// const express = require('express');
// const app = express();
// const cors = require('cors');
// const db = require('./backend/database');


// // const { updateSolde } = require('./backend/routes/solde');

// // Importer les routes
// const { router: depensesRoutes } = require('./backend/routes/depenses');
// const { router: revenusRoutes } = require('./backend/routes/revenus');
// const { router: soldeRoutes, updateSolde } = require('./backend/routes/solde');

// // Middleware pour traiter les requêtes JSON
// app.use(cors());
// app.use(express.json());

// // Utiliser les routes
// app.use('/depenses', depensesRoutes);
// app.use('/revenus', revenusRoutes);
// app.use('/solde', soldeRoutes);

// // Mettre à jour le solde après modification des dépenses/revenus
// app.post('/depenses', (req, res, next) => {
//     next();
//     updateSolde(() => {
//         res.send("Solde mis à jour après l'ajout d'une dépense");
//     });
// });

// app.post('/revenus', (req, res, next) => {
//     next();
//     updateSolde(() => {
//         res.send("Solde mis à jour après l'ajout d'un revenu");
//     });
// });

// app.put('/depense/:id', (req, res, next) => {
//     next();
//     updateSolde(() => {
//         res.send("Solde mis à jour après la modification d'une dépense");
//     });
// });

// app.put('/revenus/:id', (req, res, next) => {
//     next();
//     updateSolde(() => {
//         res.send("Solde mis à jour après la modification d'un revenu");
//     });
// });

// app.delete('/depenses/:id', (req, res, next) => {
//     next();
//     updateSolde(() => {
//         res.send("Solde mis à jour après la suppression d'une dépense");
//     });
// });

// app.delete('/revenus/:id', (req, res, next) => {
//     next();
//     updateSolde(() => {
//         res.send("Solde mis à jour après la suppression d'un revenu");
//     });
// });

// // Démarrer le serveur
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => {
//     console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
// });

