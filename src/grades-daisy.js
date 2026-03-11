// Get course code from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const courseCode = urlParams.get('course');

// Load grades from localStorage or use default data
function loadGradesFromStorage() {
    const stored = localStorage.getItem(`grades_${courseCode}`);
    if (stored) {
        return JSON.parse(stored);
    }
    return coursesData[courseCode] ? coursesData[courseCode].grades : [];
}

// Save grades to localStorage
function saveGradesToStorage(grades) {
    localStorage.setItem(`grades_${courseCode}`, JSON.stringify(grades));
}

// Current course grades
let currentGrades = [];

// Function to get grade badge class
function getGradeBadgeClass(grade) {
    if (grade >= 5.5) return 'badge-success';
    if (grade >= 5.0) return 'badge-info';
    if (grade >= 4.0) return 'badge-warning';
    return 'badge-error';
}

// Function to get type badge
function getTypeBadge(type) {
    const badges = {
        'exam': '<span class="badge badge-primary">Examen</span>',
        'test': '<span class="badge badge-secondary">Test</span>',
        'homework': '<span class="badge badge-accent">Devoir</span>',
        'quiz': '<span class="badge badge-info">Quiz</span>'
    };
    return badges[type] || `<span class="badge">${type}</span>`;
}

// Function to calculate statistics
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

// Function to calculate weighted average (overall grade)
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

// Show add grade modal
function showAddGradeModal() {
    document.getElementById('newDate').valueAsDate = new Date();
    document.getElementById('addGradeModal').showModal();
}

// Hide add grade modal
function hideAddGradeModal() {
    document.getElementById('addGradeModal').close();
    // Clear form
    document.getElementById('newDate').value = '';
    document.getElementById('newAssignment').value = '';
    document.getElementById('newType').value = 'exam';
    document.getElementById('newWeight').value = '';
    document.getElementById('newGrade').value = '';
    document.getElementById('newMax').value = '6.0';
}

// Save new grade
function saveNewGrade() {
    const date = document.getElementById('newDate').value;
    const assignment = document.getElementById('newAssignment').value;
    const type = document.getElementById('newType').value;
    const weight = document.getElementById('newWeight').value;
    const grade = parseFloat(document.getElementById('newGrade').value);
    const max = parseFloat(document.getElementById('newMax').value);
    
    // Validation
    if (!date || !assignment || !weight || isNaN(grade) || isNaN(max)) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Format date to DD.MM.YYYY
    const dateObj = new Date(date);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`;
    
    // Create new grade object
    const newGrade = {
        date: formattedDate,
        assignment: assignment,
        type: type,
        weight: weight + '%',
        grade: grade,
        max: max
    };
    
    // Add to current grades
    currentGrades.unshift(newGrade);
    
    // Save to localStorage
    saveGradesToStorage(currentGrades);
    
    // Reload display
    loadCourseData();
    
    // Hide modal
    hideAddGradeModal();
}

// Delete a grade
function deleteGrade(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
        currentGrades.splice(index, 1);
        saveGradesToStorage(currentGrades);
        loadCourseData();
    }
}

// Load course data
function loadCourseData() {
    if (!courseCode || !coursesData[courseCode]) {
        document.getElementById('courseCode').textContent = 'Cours non trouvé';
        document.getElementById('courseName').textContent = 'Ce cours n\'existe pas';
        return;
    }
    
    const course = coursesData[courseCode];
    
    // Load grades from storage
    currentGrades = loadGradesFromStorage();
    
    // Update header
    document.getElementById('courseCode').textContent = courseCode;
    document.getElementById('courseName').textContent = course.name;
    
    // Calculate overall grade
    const overallGrade = calculateWeightedAverage(currentGrades);
    document.getElementById('overallGrade').textContent = overallGrade;
    
    // Update status badge
    const statusElement = document.getElementById('gradeStatus');
    if (parseFloat(overallGrade) >= 4.0) {
        statusElement.textContent = 'Réussi ✓';
        statusElement.className = 'badge badge-lg badge-success';
    } else {
        statusElement.textContent = 'Échoué ✗';
        statusElement.className = 'badge badge-lg badge-error';
    }
    
    // Calculate and update statistics
    const stats = calculateStats(currentGrades);
    document.getElementById('avgGrade').textContent = stats.average || '-';
    document.getElementById('bestGrade').textContent = stats.best || '-';
    document.getElementById('worstGrade').textContent = stats.worst || '-';
    document.getElementById('evalCount').textContent = stats.count || '0';
    
    // Populate grades table
    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = '';
    
    if (currentGrades.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8 text-base-content/60">
                    Aucune note enregistrée. Cliquez sur "Ajouter une note" pour commencer.
                </td>
            </tr>
        `;
    } else {
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
                    <button class="btn btn-error btn-sm" onclick="deleteGrade(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadCourseData);
