const express = require('express');
const router = express.Router();
const db = require('../database');
// const { updateSolde } = require('./solde'); // Assure-toi que cette fonction est exportée depuis solde.js

// 📌 Récupérer toutes les dépenses
router.get('/', (req, res) => {
    db.query('SELECT * FROM depense', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// 📌 Ajouter une dépense
router.post('/', (req, res) => {
    const { titre, montant } = req.body;

    if (!titre || !montant) {
        return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
    }

    db.query('INSERT INTO depense (titre, montant) VALUES (?, ?)', [titre, montant], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Mise à jour du solde après ajout de la dépense
        updateSolde(() => {
            res.json({ message: '✅ Dépense ajoutée et solde mis à jour !' });
        });
    });
});

// 📌 Modifier une dépense
router.put('/:idDepense', (req, res) => {
    const depenseId = req.params.idDepense;  // L'ID de la dépense à modifier
    const { titre, montant } = req.body;

    if (!titre || !montant) {
        return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
    }

    const query = 'UPDATE depense SET titre = ?, montant = ? WHERE idDepense = ?';
    db.query(query, [titre, montant, depenseId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "❌ Dépense non trouvée." });
        }

        // Mise à jour du solde après modification de la dépense
        updateSolde(() => {
            res.json({ message: '✅ Dépense modifiée et solde mis à jour !' });
        });
    });
});

// 📌 Supprimer une dépense
router.delete('/:idDepense', (req, res) => {
    const depenseId = req.params.idDepense;

    // Récupérer le montant de la dépense à supprimer
    db.query('SELECT montant FROM depense WHERE idDepense = ?', [depenseId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "❌ Dépense non trouvée." });
        }

        const montantDepense = result[0].montant;

        // Supprimer la dépense de la base de données
        db.query('DELETE FROM depense WHERE idDepense = ?', [depenseId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Mise à jour du solde après suppression de la dépense
            updateSolde(() => {
                res.json({ message: '✅ Dépense supprimée et solde mis à jour !' });
            });
        });
    });
});

module.exports = router;
