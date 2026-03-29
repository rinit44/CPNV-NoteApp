# NoteApp - CPNV

Une application web complète permettant aux étudiants de gérer leurs notes, de calculer leurs moyennes et de suivre leur progression scolaire. 
*Projet réalisé dans le cadre du module ICT 431 au CPNV.*

## Fonctionnalités
- **Gestion des notes :** Ajout, lecture et suppression de notes avec gestion des coefficients.
- **Calculs automatiques :** Moyenne pondérée par branche et statistiques globales.
- **Gestion de l'école :** Interface liée à une base de données gérant les utilisateurs, matières, classes et trimestres.
- **Interface moderne :** Design clair et responsive utilisant **Tailwind CSS** et **daisyUI**.

## Technologies utilisées
- **Back-end :** Python, Flask, mysql-connector-python (SQL pur, sans ORM)
- **Front-end :** HTML5, JavaScript (API Fetch), Tailwind CSS, daisyUI
- **Base de données :** MySQL (hébergée dans le cloud via Railway)

## User Stories

| ID | En tant que... | Je veux pouvoir... | Afin de... |
| :--- | :--- | :--- | :--- |
| **US1** | Étudiant | Ajouter une note avec un coefficient | Suivre mes résultats d'examens. |
| **US2** | Étudiant | Voir la liste de mes notes par module | Savoir où j'en suis dans chaque branche. |
| **US3** | Étudiant | Calculer ma moyenne générale | Anticiper mon bulletin de fin d'année. |
| **US4** | Étudiant | Supprimer/Modifier une note saisie par erreur | Garder mes données à jour et précises. |

## Installation et lancement (Local)

### 1. Prérequis
- Python 3.x installé sur votre machine.
- Un terminal (PowerShell, Bash, etc.).

### 2. Configuration de l'environnement
Clonez le dépôt puis créez un environnement virtuel :
```bash
python -m venv venv
# Activation sur Windows :
.\venv\Scripts\activate
# Activation sur Mac/Linux :
source venv/bin/activate
```

Installez les dépendances nécessaires grâce au fichier `requirements.txt` :
```bash
pip install -r requirements.txt
```

### 3. Base de données et variables d'environnement
Le projet utilise une base de données MySQL.
1. Copiez le fichier `.env.example` et renommez-le en `.env`.
2. Remplissez le fichier `.env` avec vos propres identifiants de base de données (Host, Port, User, Password, Database).

### 4. Lancement de l'API (Back-end)
Lancez le serveur Flask :
```bash
python app.py
```
Le serveur tournera par défaut sur `http://127.0.0.1:5000`.

### 5. Lancement de l'interface (Front-end)
Il n'y a pas besoin de serveur complexe pour le visuel. Ouvrez simplement le fichier `dashboard.html` (ou votre fichier d'accueil principal) dans votre navigateur web. Le JavaScript se connectera automatiquement à l'API locale.

## Tests Unitaires
Le projet inclut des tests unitaires utilisant la technique du **Mocking** pour simuler la base de données sans altérer les vraies données.
Pour lancer les tests :
```bash
python test.py
```

## Auteurs
- Rinit Krasniqi
- Alessio Gutknecht
- Alexandru-Adrian Balog