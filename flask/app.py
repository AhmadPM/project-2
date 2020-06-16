
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Analytics20@localhost:5432/satellite_db"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route('/satellite', methods=['GET']) 
def contextget():
    sql_query ="""SELECT * FROM satellite"""
    out = cur.execute(sql_query)
    context_records = cur.fetchall() 
    ContextRootKeys = []
    outp ="Print each row and it's columns values"
    for row in context_records:
        satellite.append(row[1])
    conn.commit()
    print(ContextRootKeys)
    return outp


@app.route('/')
def hello():
    return {"hello": "world"}

if __name__ == '__main__':
    app.run(debug=True)