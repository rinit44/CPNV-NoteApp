// All course data - Add your real data here
const coursesData = {
    "MA-15": {
        name: "Mathématiques",
        overallGrade: 4.8,
        grades: [
            { date: "15.01.2025", assignment: "Examen Final", type: "exam", weight: "40%", grade: 5.5, max: 6.0 },
            { date: "08.01.2025", assignment: "Test Chapitre 5", type: "test", weight: "15%", grade: 6.0, max: 6.0 },
            { date: "22.12.2024", assignment: "Devoir Maison #4", type: "homework", weight: "10%", grade: 5.0, max: 6.0 },
            { date: "15.12.2024", assignment: "Test Chapitre 4", type: "test", weight: "15%", grade: 4.5, max: 6.0 },
            { date: "01.12.2024", assignment: "Devoir Maison #3", type: "homework", weight: "10%", grade: 5.5, max: 6.0 },
            { date: "24.11.2024", assignment: "Quiz Algèbre", type: "quiz", weight: "5%", grade: 4.0, max: 6.0 },
            { date: "10.11.2024", assignment: "Devoir Maison #2", type: "homework", weight: "10%", grade: 3.5, max: 6.0 },
            { date: "03.11.2024", assignment: "Devoir Maison #1", type: "homework", weight: "10%", grade: 5.0, max: 6.0 }
        ]
    },
    "MA-100": {
        name: "Mathématiques Avancées",
        overallGrade: 5.2,
        grades: [
            { date: "20.01.2025", assignment: "Examen Final", type: "exam", weight: "40%", grade: 5.5, max: 6.0 },
            { date: "13.01.2025", assignment: "Test Calcul", type: "test", weight: "20%", grade: 5.0, max: 6.0 },
            { date: "28.12.2024", assignment: "Projet Final", type: "homework", weight: "25%", grade: 5.5, max: 6.0 },
            { date: "15.12.2024", assignment: "Quiz", type: "quiz", weight: "15%", grade: 4.5, max: 6.0 }
        ]
    },
    "INI-45": {
        name: "Informatique - Bases",
        overallGrade: 5.5,
        grades: [
            { date: "18.01.2025", assignment: "Projet Python", type: "homework", weight: "35%", grade: 5.8, max: 6.0 },
            { date: "10.01.2025", assignment: "Examen Théorique", type: "exam", weight: "30%", grade: 5.5, max: 6.0 },
            { date: "20.12.2024", assignment: "TP Web", type: "homework", weight: "20%", grade: 5.2, max: 6.0 },
            { date: "05.12.2024", assignment: "Quiz Algorithmes", type: "quiz", weight: "15%", grade: 5.5, max: 6.0 }
        ]
    },
    "INI-06": {
        name: "Développement Web",
        overallGrade: 5.0,
        grades: [
            { date: "22.01.2025", assignment: "Projet Site Web", type: "homework", weight: "50%", grade: 5.2, max: 6.0 },
            { date: "15.01.2025", assignment: "Test HTML/CSS", type: "test", weight: "25%", grade: 4.8, max: 6.0 },
            { date: "08.01.2025", assignment: "Exercices JavaScript", type: "homework", weight: "25%", grade: 5.0, max: 6.0 }
        ]
    },
    "INI-03": {
        name: "Bases de Données",
        overallGrade: 4.7,
        grades: [
            { date: "19.01.2025", assignment: "Projet BDD", type: "homework", weight: "40%", grade: 5.0, max: 6.0 },
            { date: "12.01.2025", assignment: "Examen SQL", type: "exam", weight: "35%", grade: 4.5, max: 6.0 },
            { date: "25.12.2024", assignment: "TP Requêtes", type: "homework", weight: "25%", grade: 4.5, max: 6.0 }
        ]
    },
    "INI-02": {
        name: "Réseaux Informatiques",
        overallGrade: 5.3,
        grades: [
            { date: "21.01.2025", assignment: "Examen Final", type: "exam", weight: "45%", grade: 5.5, max: 6.0 },
            { date: "14.01.2025", assignment: "TP Configuration", type: "homework", weight: "30%", grade: 5.2, max: 6.0 },
            { date: "07.01.2025", assignment: "Test Protocoles", type: "test", weight: "25%", grade: 5.0, max: 6.0 }
        ]
    },
    "INI-01": {
        name: "Systèmes d'Exploitation",
        overallGrade: 4.9,
        grades: [
            { date: "23.01.2025", assignment: "Projet Linux", type: "homework", weight: "40%", grade: 5.2, max: 6.0 },
            { date: "16.01.2025", assignment: "Examen Théorique", type: "exam", weight: "35%", grade: 4.8, max: 6.0 },
            { date: "09.01.2025", assignment: "TP Shell", type: "homework", weight: "25%", grade: 4.5, max: 6.0 }
        ]
    },
    "MA-09": {
        name: "Statistiques",
        overallGrade: 4.6,
        grades: [
            { date: "17.01.2025", assignment: "Examen Final", type: "exam", weight: "45%", grade: 4.8, max: 6.0 },
            { date: "10.01.2025", assignment: "Projet Analyse", type: "homework", weight: "30%", grade: 4.5, max: 6.0 },
            { date: "20.12.2024", assignment: "Test", type: "test", weight: "25%", grade: 4.5, max: 6.0 }
        ]
    },
    "MA-24": {
        name: "Géométrie",
        overallGrade: 5.1,
        grades: [
            { date: "18.01.2025", assignment: "Examen", type: "exam", weight: "40%", grade: 5.2, max: 6.0 },
            { date: "11.01.2025", assignment: "Projet", type: "homework", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "22.12.2024", assignment: "Test", type: "test", weight: "25%", grade: 5.0, max: 6.0 }
        ]
    },
    "IEL2": {
        name: "Anglais - Niveau 2",
        overallGrade: 5.4,
        grades: [
            { date: "19.01.2025", assignment: "Oral Presentation", type: "exam", weight: "30%", grade: 5.5, max: 6.0 },
            { date: "12.01.2025", assignment: "Written Essay", type: "homework", weight: "30%", grade: 5.2, max: 6.0 },
            { date: "05.01.2025", assignment: "Grammar Test", type: "test", weight: "20%", grade: 5.5, max: 6.0 },
            { date: "18.12.2024", assignment: "Vocabulary Quiz", type: "quiz", weight: "20%", grade: 5.4, max: 6.0 }
        ]
    },
    // Add more courses as needed - I'll include a template for the rest
    "I187": {
        name: "Programmation Orientée Objet",
        overallGrade: 5.2,
        grades: [
            { date: "20.01.2025", assignment: "Projet Java", type: "homework", weight: "50%", grade: 5.5, max: 6.0 },
            { date: "13.01.2025", assignment: "Examen OOP", type: "exam", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "06.01.2025", assignment: "Quiz Classes", type: "quiz", weight: "15%", grade: 4.8, max: 6.0 }
        ]
    },
    "I319": {
        name: "Sécurité Informatique",
        overallGrade: 4.8,
        grades: [
            { date: "21.01.2025", assignment: "Projet Pentesting", type: "homework", weight: "45%", grade: 5.0, max: 6.0 },
            { date: "14.01.2025", assignment: "Examen Cryptographie", type: "exam", weight: "35%", grade: 4.7, max: 6.0 },
            { date: "07.01.2025", assignment: "TP Firewalls", type: "homework", weight: "20%", grade: 4.5, max: 6.0 }
        ]
    },
    "Mathématiques": {
        name: "Mathématiques Générales",
        overallGrade: 4.9,
        grades: [
            { date: "22.01.2025", assignment: "Examen Final", type: "exam", weight: "40%", grade: 5.0, max: 6.0 },
            { date: "15.01.2025", assignment: "Test", type: "test", weight: "30%", grade: 4.8, max: 6.0 },
            { date: "08.01.2025", assignment: "Devoir", type: "homework", weight: "30%", grade: 4.9, max: 6.0 }
        ]
    },
    "Anglais": {
        name: "Anglais Général",
        overallGrade: 5.3,
        grades: [
            { date: "23.01.2025", assignment: "Speaking Exam", type: "exam", weight: "35%", grade: 5.5, max: 6.0 },
            { date: "16.01.2025", assignment: "Essay", type: "homework", weight: "35%", grade: 5.2, max: 6.0 },
            { date: "09.01.2025", assignment: "Grammar Test", type: "test", weight: "30%", grade: 5.2, max: 6.0 }
        ]
    },
    "I293": {
        name: "Programmation Web Avancée",
        overallGrade: 5.1,
        grades: [
            { date: "22.01.2025", assignment: "Projet React", type: "homework", weight: "45%", grade: 5.3, max: 6.0 },
            { date: "15.01.2025", assignment: "Examen JavaScript", type: "exam", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "08.01.2025", assignment: "TP API REST", type: "homework", weight: "20%", grade: 4.8, max: 6.0 }
        ]
    },
    "I162": {
        name: "Architecture Logicielle",
        overallGrade: 4.9,
        grades: [
            { date: "23.01.2025", assignment: "Projet Design Patterns", type: "homework", weight: "50%", grade: 5.2, max: 6.0 },
            { date: "16.01.2025", assignment: "Examen Théorique", type: "exam", weight: "30%", grade: 4.7, max: 6.0 },
            { date: "09.01.2025", assignment: "Quiz UML", type: "quiz", weight: "20%", grade: 4.5, max: 6.0 }
        ]
    },
    "MA-20": {
        name: "Analyse Mathématique",
        overallGrade: 4.5,
        grades: [
            { date: "24.01.2025", assignment: "Examen Final", type: "exam", weight: "45%", grade: 4.8, max: 6.0 },
            { date: "17.01.2025", assignment: "Test Intégrales", type: "test", weight: "25%", grade: 4.3, max: 6.0 },
            { date: "10.01.2025", assignment: "Devoir", type: "homework", weight: "30%", grade: 4.4, max: 6.0 }
        ]
    },
    "MA-302": {
        name: "Mathématiques Discrètes",
        overallGrade: 5.3,
        grades: [
            { date: "25.01.2025", assignment: "Examen Final", type: "exam", weight: "40%", grade: 5.5, max: 6.0 },
            { date: "18.01.2025", assignment: "Projet Graphes", type: "homework", weight: "35%", grade: 5.2, max: 6.0 },
            { date: "11.01.2025", assignment: "Test Logique", type: "test", weight: "25%", grade: 5.2, max: 6.0 }
        ]
    },
    "IEL3": {
        name: "Anglais - Niveau 3",
        overallGrade: 5.5,
        grades: [
            { date: "26.01.2025", assignment: "Oral Presentation", type: "exam", weight: "35%", grade: 5.7, max: 6.0 },
            { date: "19.01.2025", assignment: "Essay Writing", type: "homework", weight: "30%", grade: 5.4, max: 6.0 },
            { date: "12.01.2025", assignment: "Listening Test", type: "test", weight: "35%", grade: 5.4, max: 6.0 }
        ]
    },
    "I431": {
        name: "Cloud Computing",
        overallGrade: 5.0,
        grades: [
            { date: "27.01.2025", assignment: "Projet AWS", type: "homework", weight: "45%", grade: 5.2, max: 6.0 },
            { date: "20.01.2025", assignment: "Examen Théorique", type: "exam", weight: "35%", grade: 4.9, max: 6.0 },
            { date: "13.01.2025", assignment: "TP Docker", type: "homework", weight: "20%", grade: 4.8, max: 6.0 }
        ]
    },
    "I164": {
        name: "DevOps & CI/CD",
        overallGrade: 5.2,
        grades: [
            { date: "28.01.2025", assignment: "Pipeline Jenkins", type: "homework", weight: "40%", grade: 5.4, max: 6.0 },
            { date: "21.01.2025", assignment: "Examen", type: "exam", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "14.01.2025", assignment: "TP GitLab CI", type: "homework", weight: "25%", grade: 5.2, max: 6.0 }
        ]
    },
    "I122": {
        name: "Développement Mobile",
        overallGrade: 4.8,
        grades: [
            { date: "29.01.2025", assignment: "Application Android", type: "homework", weight: "50%", grade: 5.0, max: 6.0 },
            { date: "22.01.2025", assignment: "Examen Kotlin", type: "exam", weight: "30%", grade: 4.5, max: 6.0 },
            { date: "15.01.2025", assignment: "Quiz UI/UX", type: "quiz", weight: "20%", grade: 4.8, max: 6.0 }
        ]
    },
    "I117": {
        name: "Intelligence Artificielle",
        overallGrade: 5.4,
        grades: [
            { date: "30.01.2025", assignment: "Projet Machine Learning", type: "homework", weight: "45%", grade: 5.6, max: 6.0 },
            { date: "23.01.2025", assignment: "Examen Théorique", type: "exam", weight: "35%", grade: 5.3, max: 6.0 },
            { date: "16.01.2025", assignment: "TP Neural Networks", type: "homework", weight: "20%", grade: 5.2, max: 6.0 }
        ]
    },
    "MA-22": {
        name: "Probabilités et Statistiques",
        overallGrade: 4.7,
        grades: [
            { date: "31.01.2025", assignment: "Examen Final", type: "exam", weight: "40%", grade: 4.9, max: 6.0 },
            { date: "24.01.2025", assignment: "Projet Analyse Données", type: "homework", weight: "35%", grade: 4.6, max: 6.0 },
            { date: "17.01.2025", assignment: "Test", type: "test", weight: "25%", grade: 4.5, max: 6.0 }
        ]
    },
    "IEL4": {
        name: "Anglais - Niveau 4",
        overallGrade: 5.6,
        grades: [
            { date: "01.02.2025", assignment: "Business Presentation", type: "exam", weight: "40%", grade: 5.8, max: 6.0 },
            { date: "25.01.2025", assignment: "Report Writing", type: "homework", weight: "35%", grade: 5.5, max: 6.0 },
            { date: "18.01.2025", assignment: "Comprehension Test", type: "test", weight: "25%", grade: 5.4, max: 6.0 }
        ]
    },
    "I216": {
        name: "Cybersécurité Avancée",
        overallGrade: 5.1,
        grades: [
            { date: "02.02.2025", assignment: "Projet Pentesting", type: "homework", weight: "45%", grade: 5.3, max: 6.0 },
            { date: "26.01.2025", assignment: "Examen", type: "exam", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "19.01.2025", assignment: "TP Forensics", type: "homework", weight: "20%", grade: 4.9, max: 6.0 }
        ]
    },
    "I306": {
        name: "Big Data & Analytics",
        overallGrade: 5.0,
        grades: [
            { date: "03.02.2025", assignment: "Projet Hadoop", type: "homework", weight: "45%", grade: 5.2, max: 6.0 },
            { date: "27.01.2025", assignment: "Examen Spark", type: "exam", weight: "35%", grade: 4.9, max: 6.0 },
            { date: "20.01.2025", assignment: "TP NoSQL", type: "homework", weight: "20%", grade: 4.8, max: 6.0 }
        ]
    },
    "I231": {
        name: "Blockchain & Cryptographie",
        overallGrade: 4.9,
        grades: [
            { date: "04.02.2025", assignment: "Smart Contract", type: "homework", weight: "40%", grade: 5.1, max: 6.0 },
            { date: "28.01.2025", assignment: "Examen Crypto", type: "exam", weight: "35%", grade: 4.8, max: 6.0 },
            { date: "21.01.2025", assignment: "TP Ethereum", type: "homework", weight: "25%", grade: 4.7, max: 6.0 }
        ]
    },
    "I123": {
        name: "Gestion de Projet IT",
        overallGrade: 5.2,
        grades: [
            { date: "05.02.2025", assignment: "Projet Agile", type: "homework", weight: "45%", grade: 5.4, max: 6.0 },
            { date: "29.01.2025", assignment: "Examen", type: "exam", weight: "30%", grade: 5.0, max: 6.0 },
            { date: "22.01.2025", assignment: "Présentation Scrum", type: "homework", weight: "25%", grade: 5.2, max: 6.0 }
        ]
    },
    "Allemand": {
        name: "Allemand Général",
        overallGrade: 4.8,
        grades: [
            { date: "06.02.2025", assignment: "Mündliche Prüfung", type: "exam", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "30.01.2025", assignment: "Aufsatz", type: "homework", weight: "35%", grade: 4.7, max: 6.0 },
            { date: "23.01.2025", assignment: "Grammatik Test", type: "test", weight: "30%", grade: 4.7, max: 6.0 }
        ]
    },
    "Histoire": {
        name: "Histoire Contemporaine",
        overallGrade: 5.1,
        grades: [
            { date: "07.02.2025", assignment: "Dissertation", type: "homework", weight: "40%", grade: 5.3, max: 6.0 },
            { date: "31.01.2025", assignment: "Examen", type: "exam", weight: "35%", grade: 5.0, max: 6.0 },
            { date: "24.01.2025", assignment: "Présentation", type: "homework", weight: "25%", grade: 4.9, max: 6.0 }
        ]
    }
};

// You can add the rest of your courses here following the same pattern