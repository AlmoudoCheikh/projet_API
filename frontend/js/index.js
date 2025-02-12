const apiBaseUrl = 'http://localhost:5050'; // Assurez-vous que l'API backend fonctionne sur ce port

let tabStockDepense = [];
let tabStockRevenu = [];

const depenseTotalElement = document.getElementById('totalDepense');
const revenuTotalElement = document.getElementById('totalRevenu');
const soldeElement = document.getElementById('totalSoldes');



// Fonction pour récupérer les dépenses depuis l'API
function fetchDepenses() {
    fetch(`${apiBaseUrl}/depenses`)
        .then(response => response.json())
        .then(data => {
            console.log('Dépenses récupérées:', data);
            tabStockDepense = data; // Mettre à jour les dépenses
            updateTableDepense(); // Mettre à jour la table des dépenses
            updateTotalDepense(); // Mettre à jour le total des dépenses
            calculerSolde(); // Recalculer le solde
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des dépenses:', error);
        });
}

// Fonction pour récupérer les revenus depuis l'API
function fetchRevenus() {
    fetch(`${apiBaseUrl}/revenus`)
        .then(response => response.json())
        .then(data => {
            console.log('Revenus récupérés:', data);
            tabStockRevenu = data; // Mettre à jour les revenus
            updateTableRevenu(); // Mettre à jour la table des revenus
            updateTotalRevenu(); // Mettre à jour le total des revenus
            calculerSolde(); // Recalculer le solde
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des revenus:', error);
        });
}

// Calculer et afficher le total des dépenses
function updateTotalDepense() {
    const totalDepense = tabStockDepense.reduce((acc, depense) => acc + (Number(depense.montant) || 0), 0);
    depenseTotalElement.textContent = `${totalDepense} FCFA`;
}

// Calculer et afficher le total des revenus
function updateTotalRevenu() {
    const totalRevenu = tabStockRevenu.reduce((acc, revenu) => acc + (Number(revenu.montant) || 0), 0);
    revenuTotalElement.textContent = `${totalRevenu} FCFA`;
}

// Calculer le solde (différence entre les revenus et les dépenses)
function calculerSolde() {
    const totalDepense = tabStockDepense.reduce((acc, depense) => acc + (Number(depense.montant) || 0), 0);
    const totalRevenu = tabStockRevenu.reduce((acc, revenu) => acc + (Number(revenu.montant) || 0), 0);
    const solde = totalRevenu - totalDepense;
    soldeElement.textContent = `${solde} FCFA`;
}

// Récupérer les dépenses et les revenus au chargement de la page
window.onload = function () {
    fetchDepenses();
    fetchRevenus();
};


// Ajouter une dépense via l'API

document.getElementById('formDepense').addEventListener('submit', function (event) {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const montant = parseFloat(document.getElementById('montant').value); // Assurez-vous que le montant est un nombre

    if (!titre || isNaN(montant)) {
        alert("Merci de remplir tous les champs correctement !");
        return;
    }

    const newDepense = { titre, montant };

    // Envoi de la dépense à l'API
    fetch(`${apiBaseUrl}/depenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDepense)
    })
        .then(response => response.json())
        .then(data => {
            fetchDepenses(); // Rafraîchir la liste des dépenses
        })
        .catch(error => console.error('Erreur lors de l\'ajout de la dépense:', error));

    document.getElementById('titre').value = '';
    document.getElementById('montant').value = '';
    document.getElementById('contactModal').style.display = 'none'; // Fermer le modal
});


// 2. Supprimer une dépense via l'API
function deleteDepense(index) {
    const depense = tabStockDepense[index]; // Récupérer la dépense à partir de l'index
    const depenseId = depense.idDepense; // Utiliser l'ID de la dépense pour la suppression

    fetch(`${apiBaseUrl}/depenses/${depenseId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de la dépense");
        }
        return response.json();
    })
    .then(() => {
        // Rafraîchir la liste des dépenses après suppression
        fetchDepenses();
    })
    .catch(error => {
        console.error('Erreur lors de la suppression de la dépense:', error);
    });
}

// 3. Ajouter un revenu via l'API
document.getElementById('formRevenu').addEventListener('submit', function (event) {
    event.preventDefault();

    const titreR = document.getElementById('titreR').value;
    const montantR = document.getElementById('montantR').value;

    if (!titreR || !montantR) {
        alert("Merci de remplir tous les champs !");
        return;
    }

    const newRevenu = { titreR, montantR };

    // Envoi du revenu à l'API
    fetch(`${apiBaseUrl}/revenus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRevenu)
    })
        .then(response => response.json())
        .then(data => {
            fetchRevenus(); // Rafraîchir la liste des revenus
        })
        .catch(error => console.error('Erreur lors de l\'ajout du revenu:', error));

    document.getElementById('titreR').value = '';
    document.getElementById('montantR').value = '';
    document.getElementById('contactModalR').style.display = 'none'; // Fermer le modal
});

function deleteRevenu(index) {
    const revenu = tabStockRevenu[index]; // Récupérer le revenu à partir de l'index
    const revenuId = revenu.idRevenu; // Utiliser l'ID du revenu pour la suppression

    fetch(`${apiBaseUrl}/revenus/${revenuId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du revenu");
        }
        return response.json();
    })
    .then(() => {
        // Rafraîchir la liste des revenus après suppression
        fetchRevenus();
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du revenu:', error);
    });
}

// parti pour ajouter une depense

document.getElementById('addContactModalButton').addEventListener('click', function () {
    // Ouvrir le modal pour ajouter une dépense
    document.getElementById('contactModal').style.display = 'block';
});

document.getElementById('formDepense').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const titre = document.getElementById('titre').value;
    const montant = parseFloat(document.getElementById('montant').value);


    const newDepense = { titre, montant };

    // Envoi de la dépense à l'API
    fetch(`${apiBaseUrl}/depenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDepense)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Dépense ajoutée:", data);

            // Ajouter la nouvelle dépense à la liste locale (tabStockDepense)
            tabStockDepense.push(newDepense);

            // Mettre à jour la table des dépenses
            updateTableDepense();

            // Recalculer le solde
            calculerSolde();

            // Fermer le modal et réinitialiser les champs
            document.getElementById('contactModal').style.display = 'none';
            document.getElementById('titre').value = '';
            document.getElementById('montant').value = '';
        })
        .catch(error => console.error('Erreur lors de l\'ajout de la dépense:', error));
});

// Fonction pour mettre à jour la table des dépenses après ajout
function updateTableDepense() {
    const tableDepense = document.querySelector('#tableDepense');
    tableDepense.innerHTML = ''; // Réinitialiser la table pour éviter la duplication des lignes

    tabStockDepense.forEach((depense, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${depense.titre}</td>
            <td>${depense.montant}</td>
            <td>
               
                <button onclick="deleteDepense(${index})">Supprimer</button>
            </td>
        `;
        tableDepense.appendChild(tr);
    });
}

// Ouvrir le modal pour ajouter un revenu
document.querySelector('.addContactModalButtonR').addEventListener('click', function () {
    // Ouvrir le modal pour ajouter un revenu
    document.getElementById('contactModalR').style.display = 'block';
});

document.getElementById('formRevenu').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const titreR = document.getElementById('titreR').value;
    const montantR = parseFloat(document.getElementById('montantR').value);

    // Log des données avant envoi à l'API
    console.log("Titre:", titreR);
    console.log("Montant:", montantR);

    

    const newRevenu = { titreR, montanRt };

    // Log de l'objet à envoyer
    console.log("Revenu à envoyer:", newRevenu);

    // Envoi de revenu à l'API
    fetch(`${apiBaseUrl}/revenus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRevenu)
    })

        .then(response => response.json())
        .then(data => {
            console.log("Revenu ajoutée:", data);

            // Ajouter la nouvelle dépense à la liste locale (tabStockRevenu)
            tabStockRevenu.push(newRevenu);

            // Mettre à jour la table des revenus
            updateTableRevenu();

            // Recalculer le solde
            calculerSolde();

            // Fermer le modal et réinitialiser les champs
            document.getElementById('contactModalR').style.display = 'none';
            document.getElementById('titreR').value = '';
            document.getElementById('montantR').value = '';
        })
        .catch(error => console.error('Erreur lors de l\'ajout du revenu:', error));

});

// Fonction pour mettre à jour la table des revenus après ajout
function updateTableRevenu() {
    const tableRevenu = document.querySelector('#tableRevenu');
    tableRevenu.innerHTML = ''; // Réinitialiser la table pour éviter la duplication des lignes

    tabStockRevenu.forEach((revenu, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${revenu.titre}</td>
            <td>${revenu.montant}</td>
            <td>
                
                <button onclick="deleteRevenu(${index})">Supprimer</button>
            </td>
        `;
        tableRevenu.appendChild(tr);
    });
}


// Fonction pour fermer le modal si l'utilisateur clique en dehors
const modal = document.getElementById('contactModal'); // Récupérer l'élément modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Fermer le modal
    }
};



// // modif

function editDepense(index) {
    const depense = tabStockDepense[index];
    // Ouvrir le formulaire de modification et pré-remplir les champs
    document.getElementById('titre').value = depense.titre;
    document.getElementById('montant').value = depense.montant;

    // Ouvrir le modal pour modifier la dépense
    document.getElementById('contactModal').style.display = 'block';

    // Ajouter un événement sur le formulaire pour mettre à jour la dépense
    document.getElementById('formDepense').onsubmit = function (event) {
        event.preventDefault();

        // Récupérer les nouvelles valeurs
        const updatedTitre = document.getElementById('titre').value;
        const updatedMontant = parseFloat(document.getElementById('montant').value);

        // Créer l'objet mis à jour
        const updatedDepense = { titre: updatedTitre, montant: updatedMontant };

        // Vérification des données envoyées
        console.log('Dépense modifiée:', updatedDepense);

        // Envoyer la requête PUT à l'API pour mettre à jour la dépense
        fetch(`${apiBaseUrl}/depenses/${depense.idDepense}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDepense)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la modification');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dépense modifiée avec succès:', data);

            // Mettre à jour la liste locale et la table des dépenses
            tabStockDepense[index] = updatedDepense;
            updateTableDepense();  // Mettre à jour la table

            // Recalculer le solde
            calculerSolde();

            // Fermer le modal et réinitialiser les champs
            document.getElementById('contactModal').style.display = 'none';
            document.getElementById('titre').value = '';
            document.getElementById('montant').value = '';
        })
        .catch(error => {
            console.error('Erreur lors de la modification de la dépense:', error);
        });
    };
}




function editRevenu(index) {
    const revenu = tabStockRevenu[index];
    // Ouvrir le formulaire de modification et pré-remplir les champs
    document.getElementById('titreR').value = revenu.titre;
    document.getElementById('montantR').value = revenu.montant;

    // Ouvrir le modal pour modifier le revenu
    document.getElementById('contactModalR').style.display = 'block';

    // Ajouter un événement sur le formulaire pour mettre à jour le revenu
    document.getElementById('formRevenu').onsubmit = function (event) {
        event.preventDefault();

        const updatedTitreR = document.getElementById('titreR').value;
        const updatedMontantR = parseFloat(document.getElementById('montantR').value);

        const updatedRevenu = { titreR: updatedTitreR, montantR: updatedMontantR };

        // Log pour vérifier les données envoyées
        console.log('Revenu modifié:', updatedRevenu);

        // Envoyer la requête PUT à l'API pour mettre à jour le revenu
        fetch(`${apiBaseUrl}/revenus/${revenu.idRevenu}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRevenu)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la modification');
            }
            return response.json();
        })
        .then(data => {
            console.log('Revenu modifié avec succès:', data);

            // Mettre à jour la liste locale
            tabStockRevenu[index] = updatedRevenu;  // Remplace l'ancien revenu par le nouveau
            updateTableRevenu();  // Met à jour la table

            // Recalculer le solde
            calculerSolde();

            // Fermer le modal et réinitialiser les champs
            document.getElementById('contactModalR').style.display = 'none';
            document.getElementById('titreR').value = '';
            document.getElementById('montantR').value = '';
        })
        .catch(error => {
            console.error('Erreur lors de la modification du revenu:', error);
        });
    };
}


// 7. Appel des fonctions de récupération lors du chargement de la page
window.onload = function () {
    fetchDepenses();
    fetchRevenus();
};

