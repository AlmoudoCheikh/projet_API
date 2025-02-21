

// const express = require('express');
// const db = require('../database');
// const { updateSolde } = require('./solde');

// const router = express.Router();

// // 📌 Récupérer tous les revenus
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM revenu', (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(result);
//     });
// });

// // 📌 Ajouter un revenu
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

//     if (!titreR || !montantR) {
//         return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
//     }

//     const query = 'UPDATE revenu SET titreR = ?, montantR = ? WHERE idRevenu = ?';
//     db.query(query, [titreR, montantR, revenuId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "❌ Revenu non trouvé." });
//         }

//         // Mise à jour du solde après modification du revenu
//         updateSolde(() => {
//             res.json({ message: '✅ Revenu modifié et solde mis à jour !' });
//         });
//     });
// });

// // 📌 Supprimer un revenu
// router.delete('/:idRevenu', (req, res) => {
//     const revenuId = req.params.idRevenu;

//     db.query('SELECT montantR FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//         // if (err) {
//         //     return res.status(500).json({ error: err.message });
//         // }

//         // if (result.length === 0) {
//         //     return res.status(404).json({ message: "❌ Revenu non trouvé." });
//         // }

//         // const montantRevenu = result[0].montantR;

//         // db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//         //     if (err) {
//         //         return res.status(500).json({ error: err.message });
//         //     }

//         //     // Mise à jour du solde après suppression du revenu
//         //     updateSolde(() => {
//         //         res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
//         //     });
//         // });


//         // db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//         //     if (err) {
//         //         console.error("Erreur SQL lors de la suppression du revenu", err);
//         //         return res.status(500).json({ error: err.message });
//         //     }
//         //     console.log("Revenu supprimé avec succès");
//         //     updateSolde(() => {
//         //         res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
//         //     });
//         // });


//         db.query('SELECT * FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//             if (err) {
//                 console.error("Erreur de sélection dans la base de données", err);
//                 return res.status(500).json({ error: err.message });
//             }
        
//             if (result.length === 0) {
//                 console.log("Aucun revenu trouvé pour cet ID");
//                 return res.status(404).json({ message: "❌ Revenu non trouvé." });
//             }
        
//             // Suppression du revenu si trouvé
//             db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
//                 if (err) {
//                     console.error("Erreur lors de la suppression du revenu", err);
//                     return res.status(500).json({ error: err.message });
//                 }
//                 console.log("Revenu supprimé avec succès");
//                 updateSolde(() => {
//                     res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
//                 });
//             });
//         });
        

        
//     });
// });

// module.exports = router;


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

    const query = 'UPDATE revenu SET titre = ?, montant = ? WHERE idRevenu = ?';
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

    // Vérification du revenu à supprimer
    db.query('SELECT * FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "❌ Revenu non trouvé." });
        }

        // Suppression du revenu
        db.query('DELETE FROM revenu WHERE idRevenu = ?', [revenuId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Mise à jour du solde après suppression du revenu
            updateSolde(() => {
                res.json({ message: '✅ Revenu supprimé et solde mis à jour !' });
            });
        });
    });
});

module.exports = router;
