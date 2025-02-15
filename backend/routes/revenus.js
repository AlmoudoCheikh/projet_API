// const express = require('express');
// const router = express.Router();  // Création du router
// const db = require('../database');
// // const { updateSolde } = require('./solde'); // Assure-toi que cette fonction est exportée depuis solde.js


// // 📌 Récupérer tous les revenus
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM revenu', (err, result) => {
//         if (err) throw err;
//         res.json(result);
//     });
// });

// // 📌 Ajouter un revenu
// const { updateSolde } = require('./solde'); // Importer updateSolde

// router.post('/', (req, res) => {
//     const { titreR, montantR } = req.body;

//     if (!titreR || !montantR) {
//         return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
//     }

//     db.query('INSERT INTO revenu (titre, montant) VALUES (?, ?)', [titreR, montantR], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         // Mise à jour du solde après ajout du revenu
//         updateSolde(() => {
//             res.json({ message: '✅ Revenu ajouté et solde mis à jour !' });
//         });
//     });
// });

// // 📌 Modifier un revenu
// router.put('/:idRevenu', (req, res) => {
//     const revenuId = req.params.idRevenu;
//     const { titreR, montantR } = req.body;

//     console.log("ID reçu pour modification :", revenuId);  // Log de l'ID reçu
//     console.log("Données envoyées :", { titreR, montantR });  // Log des données envoyées

//     // Vérifier que les données nécessaires sont présentes
//     if (!titreR || !montantR) {
//         return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
//     }

//     // Mettre à jour le revenu dans la base de données
//     const query = 'UPDATE revenu SET titre = ?, montant = ? WHERE idRevenu = ?';

//     db.query(query, [titreR, montantR, revenuId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "❌ Revenu non trouvé." });
//         }

//         updateSolde(() => {
//             res.json({ message: '✅ Revenu modifié et solde mis à jour !' });
//         });
//     });
// });

// // 📌 Supprimer un revenu
// router.delete('/:idRevenu', (req, res) => {
//     const revenuId = req.params.idRevenu;

//     // Récupérer le montant du revenu à supprimer
//     db.query('SELECT montant FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ message: "❌ Revenu non trouvé." });
//         }

//         const montantRevenu = result[0].montant;

//         // Supprimer le revenu de la base de données
//         db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }

//             // Mise à jour du solde après suppression du revenu
//             updateSolde(() => {
//                 res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
//             });
//         });
//     });
// });

// module.exports = router;  // Assurez-vous de bien exporter `router`




const express = require('express');
const db = require('../database');
const { updateSolde } = require('./solde');

const router = express.Router();

// 📌 Récupérer tous les revenus
router.get('/', (req, res) => {
    db.query('SELECT * FROM revenu', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// 📌 Ajouter un revenu
router.post('/', (req, res) => {
    const { titreR, montantR } = req.body;

    if (!titreR || !montantR) {
        return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
    }

    db.query('INSERT INTO revenu (titre, montant) VALUES (?, ?)', [titreR, montantR], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Mise à jour du solde après ajout du revenu
        updateSolde(() => {
            res.json({ message: '✅ Revenu ajouté et solde mis à jour !' });
        });
    });
});

// 📌 Modifier un revenu
router.put('/:idRevenu', (req, res) => {
    const revenuId = req.params.idRevenu;
    const { titreR, montantR } = req.body;

    if (!titreR || !montantR) {
        return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
    }

    const query = 'UPDATE revenu SET titreR = ?, montantR = ? WHERE idRevenu = ?';
    db.query(query, [titreR, montantR, revenuId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "❌ Revenu non trouvé." });
        }

        // Mise à jour du solde après modification du revenu
        updateSolde(() => {
            res.json({ message: '✅ Revenu modifié et solde mis à jour !' });
        });
    });
});

// 📌 Supprimer un revenu
router.delete('/:idRevenu', (req, res) => {
    const revenuId = req.params.idRevenu;

    db.query('SELECT montantR FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
        // if (err) {
        //     return res.status(500).json({ error: err.message });
        // }

        // if (result.length === 0) {
        //     return res.status(404).json({ message: "❌ Revenu non trouvé." });
        // }

        // const montantRevenu = result[0].montantR;

        // db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
        //     if (err) {
        //         return res.status(500).json({ error: err.message });
        //     }

        //     // Mise à jour du solde après suppression du revenu
        //     updateSolde(() => {
        //         res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
        //     });
        // });


        // db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
        //     if (err) {
        //         console.error("Erreur SQL lors de la suppression du revenu", err);
        //         return res.status(500).json({ error: err.message });
        //     }
        //     console.log("Revenu supprimé avec succès");
        //     updateSolde(() => {
        //         res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
        //     });
        // });


        db.query('SELECT * FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
            if (err) {
                console.error("Erreur de sélection dans la base de données", err);
                return res.status(500).json({ error: err.message });
            }
        
            if (result.length === 0) {
                console.log("Aucun revenu trouvé pour cet ID");
                return res.status(404).json({ message: "❌ Revenu non trouvé." });
            }
        
            // Suppression du revenu si trouvé
            db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la suppression du revenu", err);
                    return res.status(500).json({ error: err.message });
                }
                console.log("Revenu supprimé avec succès");
                updateSolde(() => {
                    res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
                });
            });
        });
        

        
    });
});

module.exports = router;
