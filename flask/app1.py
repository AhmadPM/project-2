import psycopg2
from flask import Flask, render_template


app = Flask(__name__)
con = psycopg2.connect("postgresql://postgres:Analytics20@localhost:5432/satellite_db")
cursor = con.cursor()

@app.route("/satellite", methods=['post', 'get'])
def test():  
    cursor.execute("select * from satelitte")
    result = cursor.fetchall()
    return render_template("test.html", data=result)


if __name__ == '__main__':
    app.run(debug=True)