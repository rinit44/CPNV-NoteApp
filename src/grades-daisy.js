const urlParams = new URLSearchParams(window.location.search);
const courseCode = urlParams.get('course');
let currentGrades = [];
let currentMatiereId = null;

const USER_ID = 1;
const API_URL = 'http://127.0.0.1:5000';

function getGradeBadgeClass(grade) {
    if (grade >= 5.5) return 'badge-success';
    if (grade >= 5.0) return 'badge-info';
    if (grade >= 4.0) return 'badge-warning';
    return 'badge-error';
}

function getTypeBadge(type) {
    const badges = {
        'exam': '<span class="badge badge-primary">Examen</span>',
        'test': '<span class="badge badge-secondary">Test</span>',
        'homework': '<span class="badge badge-accent">Devoir</span>',
        'quiz': '<span class="badge badge-info">Quiz</span>'
    };
    return badges[type] || `<span class="badge">${type}</span>`;
}

function calculateStats(grades) {
    if (grades.length === 0) {
        return { average: 0, best: 0, worst: 0, count: 0 };
    }
    const gradeValues = grades.map(g => g.grade);
    const avg = gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length;
    const best = Math.max(...gradeValues);
    const worst = Math.min(...gradeValues);
    return {
        average: avg.toFixed(1),
        best: best.toFixed(1),
        worst: worst.toFixed(1),
        count: grades.length
    };
}

function calculateWeightedAverage(grades) {
    if (grades.length === 0) return 0;
    let totalWeight = 0;
    let weightedSum = 0;
    grades.forEach(g => {
        const weight = parseFloat(g.weight) || 0;
        totalWeight += weight;
        weightedSum += (g.grade * weight);
    });
    if (totalWeight === 0) {
        const sum = grades.reduce((acc, g) => acc + g.grade, 0);
        return (sum / grades.length).toFixed(1);
    }
    return (weightedSum / totalWeight).toFixed(1);
}

function showAddGradeModal() {
    document.getElementById('newDate').valueAsDate = new Date();
    document.getElementById('addGradeModal').showModal();
}

function hideAddGradeModal() {
    document.getElementById('addGradeModal').close();
    document.getElementById('newDate').value = '';
    document.getElementById('newAssignment').value = '';
    document.getElementById('newType').value = 'exam';
    document.getElementById('newWeight').value = '';
    document.getElementById('newGrade').value = '';
    document.getElementById('newMax').value = '6.0';
}

async function saveNewGrade() {
    const date = document.getElementById('newDate').value;
    const weight = document.getElementById('newWeight').value;
    const grade = parseFloat(document.getElementById('newGrade').value);
    const max = parseFloat(document.getElementById('newMax').value);

    if (!currentMatiereId) {
        alert("Impossible d'ajouter une note : cette matière n'existe pas dans la base de données.");
        return;
    }

    if (!date || !weight || isNaN(grade) || isNaN(max)) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    try {
        await fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                coefficient: parseFloat(weight),
                value: grade,
                date: date + " 00:00:00",
                matiere_id: currentMatiereId,
                user_id: USER_ID
            })
        });
        hideAddGradeModal();
        loadCourseData();
    } catch (error) {
        console.error(error);
        alert("Erreur lors de la sauvegarde");
    }
}

async function deleteGrade(index, noteId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
        try {
            await fetch(`${API_URL}/notes/${noteId}`, {
                method: 'DELETE'
            });
            loadCourseData();
        } catch (error) {
            console.error(error);
        }
    }
}

async function loadCourseData() {
    if (!courseCode) return;
    
    document.getElementById('courseCode').textContent = courseCode;
    document.getElementById('courseName').textContent = "Matière : " + courseCode; 

    try {
        const matResponse = await fetch(`${API_URL}/matieres`);
        const matieres = await matResponse.json();
        const matiereTrouvee = matieres.find(m => m.Name === courseCode || m.name === courseCode);
        
        if (matiereTrouvee) {
            currentMatiereId = matiereTrouvee.ID;
        } else {
            console.warn(`La matière ${courseCode} n'existe pas encore dans la base de données !`);
        }

        const response = await fetch(`${API_URL}/users/${USER_ID}/notes`);
        const allNotes = await response.json();
        const courseNotes = allNotes.filter(n => n.matiere === courseCode);

        currentGrades = courseNotes.map(n => {
            const dateObj = new Date(n.Date);
            return {
                id: n.ID,
                date: `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`,
                assignment: "Évaluation",
                type: "exam",
                weight: n.coefficient + "%",
                grade: n.Value,
                max: 6.0
            };
        });
        updateDisplay();
    } catch (error) {
        console.error(error);
        document.getElementById('gradesTableBody').innerHTML = '<tr><td colspan="7" class="text-center text-error">Erreur de connexion.</td></tr>';
    }
}

function updateDisplay() {
    const overallGrade = calculateWeightedAverage(currentGrades);
    document.getElementById('overallGrade').textContent = overallGrade;
    
    const statusElement = document.getElementById('gradeStatus');
    if (parseFloat(overallGrade) >= 4.0) {
        statusElement.textContent = 'Réussi ✓';
        statusElement.className = 'badge badge-lg badge-success';
    } else {
        statusElement.textContent = 'Échoué ✗';
        statusElement.className = 'badge badge-lg badge-error';
    }
    
    const stats = calculateStats(currentGrades);
    document.getElementById('avgGrade').textContent = stats.average || '-';
    document.getElementById('bestGrade').textContent = stats.best || '-';
    document.getElementById('worstGrade').textContent = stats.worst || '-';
    document.getElementById('evalCount').textContent = stats.count || '0';
    
    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = '';
    
    if (currentGrades.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-base-content/60">Aucune note enregistrée. Cliquez sur "Ajouter une note" pour commencer.</td></tr>`;
        return;
    }
    
    currentGrades.forEach((grade, index) => {
        const row = document.createElement('tr');
        row.className = 'hover';
        row.innerHTML = `
            <td>${grade.date}</td>
            <td class="font-semibold">${grade.assignment}</td>
            <td>${getTypeBadge(grade.type)}</td>
            <td>${grade.weight}</td>
            <td><span class="badge ${getGradeBadgeClass(grade.grade)} badge-lg font-bold">${grade.grade.toFixed(1)}</span></td>
            <td class="text-base-content/60">${grade.max.toFixed(1)}</td>
            <td>
                <button class="btn btn-error btn-sm" onclick="deleteGrade(${index}, ${grade.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', loadCourseData);