from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    matiere = db.Column(db.String(100), nullable=False)
    valeur = db.Column(db.Float, nullable=False)
    coefficient = db.Column(db.Integer, default=1)


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    notes = Note.query.all()
    return render_template('index.html', notes=notes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)