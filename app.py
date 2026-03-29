from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import IntegrityError
import os
from dotenv import load_dotenv

# Charge les variables depuis le fichier .env
load_dotenv()

app = Flask(__name__)
CORS(app)



# ===========================================================
# CONNEXION BASE DE DONNÉES
# ===========================================================

def get_db():
    """Ouvre et retourne une connexion à la base de données MySQL (Railway)."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

def _execute(query, params=(), fetch=None, commit=False):
    """
    Fonction interne qui gère l'exécution de toutes les requêtes SQL.
    - fetch="one"  : retourne une seule ligne (dict)
    - fetch="all"  : retourne toutes les lignes (liste de dicts)
    - commit=True  : pour INSERT / UPDATE / DELETE
    """
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(query, params)
        if commit:
            conn.commit()
            return cursor.lastrowid, cursor.rowcount
        if fetch == "one":
            return cursor.fetchone()
        if fetch == "all":
            return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()


# ===========================================================
# ROUTES — USERS
# ===========================================================

@app.route("/users", methods=["GET"])
def get_all_users():
    users = _execute("SELECT ID, Name, firstname, Email, Role FROM Users", fetch="all")
    return jsonify(users), 200

@app.route("/users/<int:id>", methods=["GET"])
def get_user_by_id(id):
    user = _execute("SELECT ID, Name, firstname, Email, Role FROM Users WHERE ID = %s", (id,), fetch="one")
    if not user:
        return jsonify({"erreur": "Utilisateur non trouvé"}), 404
    return jsonify(user), 200

@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    try:
        last_id, _ = _execute(
            "INSERT INTO Users (Name, firstname, Email, Password, Role) VALUES (%s, %s, %s, %s, %s)",
            (data["name"], data["firstname"], data["email"], data["password"], data["role"]),
            commit=True
        )
        return jsonify({"message": "Utilisateur créé", "id": last_id}), 201
    except IntegrityError:
        return jsonify({"erreur": "Email déjà utilisé"}), 409

@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.get_json()
    _, rowcount = _execute(
        "UPDATE Users SET Name=%s, firstname=%s, Email=%s, Role=%s WHERE ID=%s",
        (data["name"], data["firstname"], data["email"], data["role"], id),
        commit=True
    )
    if not rowcount:
        return jsonify({"erreur": "Utilisateur non trouvé"}), 404
    return jsonify({"message": "Utilisateur mis à jour"}), 200

@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    _, rowcount = _execute("DELETE FROM Users WHERE ID = %s", (id,), commit=True)
    if not rowcount:
        return jsonify({"erreur": "Utilisateur non trouvé"}), 404
    return jsonify({"message": "Utilisateur supprimé"}), 200


# ===========================================================
# ROUTES — CLASSROOMS
# ===========================================================

@app.route("/classrooms", methods=["GET"])
def get_all_classrooms():
    return jsonify(_execute("SELECT * FROM Classrooms", fetch="all")), 200

@app.route("/classrooms/<int:id>", methods=["GET"])
def get_classroom_by_id(id):
    classroom = _execute("SELECT * FROM Classrooms WHERE ID = %s", (id,), fetch="one")
    if not classroom:
        return jsonify({"erreur": "Classe non trouvée"}), 404
    return jsonify(classroom), 200

@app.route("/classrooms", methods=["POST"])
def create_classroom():
    data = request.get_json()
    try:
        last_id, _ = _execute(
            "INSERT INTO Classrooms (Name, Type, Teacher) VALUES (%s, %s, %s)",
            (data["name"], data["type"], data["teacher"]),
            commit=True
        )
        return jsonify({"message": "Classe créée", "id": last_id}), 201
    except IntegrityError:
        return jsonify({"erreur": "Nom de classe déjà utilisé"}), 409

@app.route("/classrooms/<int:id>", methods=["DELETE"])
def delete_classroom(id):
    _, rowcount = _execute("DELETE FROM Classrooms WHERE ID = %s", (id,), commit=True)
    if not rowcount:
        return jsonify({"erreur": "Classe non trouvée"}), 404
    return jsonify({"message": "Classe supprimée"}), 200

@app.route("/classrooms/<int:id>/users", methods=["GET"])
def get_users_of_classroom(id):
    users = _execute("""
        SELECT u.ID, u.Name, u.firstname, u.Email, u.Role
        FROM Users_Classrooms uc
        JOIN Users u ON uc.Users_ID = u.ID
        WHERE uc.Classrooms_ID = %s
    """, (id,), fetch="all")
    return jsonify(users), 200

@app.route("/classrooms/<int:classroom_id>/users/<int:user_id>", methods=["POST"])
def assign_user_to_classroom(classroom_id, user_id):
    try:
        _execute(
            "INSERT INTO Users_Classrooms (Users_ID, Classrooms_ID) VALUES (%s, %s)",
            (user_id, classroom_id), commit=True
        )
        return jsonify({"message": "Utilisateur ajouté à la classe"}), 201
    except IntegrityError:
        return jsonify({"erreur": "Déjà inscrit"}), 409


# ===========================================================
# ROUTES — MATIÈRES
# ===========================================================

@app.route("/matieres", methods=["GET"])
def get_all_matieres():
    return jsonify(_execute("SELECT * FROM Matiers", fetch="all")), 200

@app.route("/matieres", methods=["POST"])
def create_matiere():
    data = request.get_json()
    last_id, _ = _execute(
        "INSERT INTO Matiers (Name, Teacher, Theme) VALUES (%s, %s, %s)",
        (data["name"], data["teacher"], data["theme"]),
        commit=True
    )
    return jsonify({"message": "Matière créée", "id": last_id}), 201

@app.route("/matieres/<int:id>", methods=["DELETE"])
def delete_matiere(id):
    _, rowcount = _execute("DELETE FROM Matiers WHERE ID = %s", (id,), commit=True)
    if not rowcount:
        return jsonify({"erreur": "Matière non trouvée"}), 404
    return jsonify({"message": "Matière supprimée"}), 200


# ===========================================================
# ROUTES — NOTES
# ===========================================================

@app.route("/notes", methods=["GET"])
def get_all_notes():
    return jsonify(_execute("SELECT * FROM Notes", fetch="all")), 200

@app.route("/notes/<int:id>", methods=["GET"])
def get_note_by_id(id):
    note = _execute("SELECT * FROM Notes WHERE ID = %s", (id,), fetch="one")
    if not note:
        return jsonify({"erreur": "Note non trouvée"}), 404
    return jsonify(note), 200

@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json()
    last_id, _ = _execute(
        "INSERT INTO Notes (coefficient, Value, Date, Matiers_ID) VALUES (%s, %s, %s, %s)",
        (data["coefficient"], data["value"], data["date"], data["matiere_id"]),
        commit=True
    )
    if "user_id" in data:
        _execute(
            "INSERT INTO Users_Notes (Users_ID, Notes_ID) VALUES (%s, %s)",
            (data["user_id"], last_id), commit=True
        )
    return jsonify({"message": "Note créée", "id": last_id}), 201

@app.route("/notes/<int:id>", methods=["DELETE"])
def delete_note(id):
    _execute("DELETE FROM Users_Notes WHERE Notes_ID = %s", (id,), commit=True)
    
    _, rowcount = _execute("DELETE FROM Notes WHERE ID = %s", (id,), commit=True)
    
    if not rowcount:
        return jsonify({"erreur": "Note non trouvée"}), 404
    return jsonify({"message": "Note supprimée"}), 200

@app.route("/users/<int:user_id>/notes", methods=["GET"])
def get_notes_of_user(user_id):
    notes = _execute("""
        SELECT n.ID, n.Value, n.coefficient, n.Date, m.Name AS matiere
        FROM Users_Notes un
        JOIN Notes n ON un.Notes_ID = n.ID
        JOIN Matiers m ON n.Matiers_ID = m.ID
        WHERE un.Users_ID = %s
    """, (user_id,), fetch="all")
    return jsonify(notes), 200


# ===========================================================
# ROUTES — QUARTERS
# ===========================================================

@app.route("/quarters", methods=["GET"])
def get_all_quarters():
    return jsonify(_execute("SELECT * FROM quarters", fetch="all")), 200

@app.route("/quarters", methods=["POST"])
def create_quarter():
    data = request.get_json()
    last_id, _ = _execute(
        "INSERT INTO quarters (`Num.`, Year) VALUES (%s, %s)",
        (data["num"], data["year"]), commit=True
    )
    return jsonify({"message": "Trimestre créé", "id": last_id}), 201


# ===========================================================
# LANCEMENT
# ===========================================================

if __name__ == "__main__":
    app.run(debug=True)