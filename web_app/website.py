# flask --app website run

import sys
import json
from flask import Flask, render_template, request
sys.path.append("../")
from model import HeartDiseasePredictor

app = Flask(__name__)
HDP = HeartDiseasePredictor("static/data/heart.csv")

@app.route('/', methods=['GET'])
def home():
   return render_template('index.html')

@app.route('/api/user', methods=["GET","POST"])
def api_user_data():
   data = json.loads(request.data)
   data["Oldpeak"] = HDP.normalize_oldpeak(float(data["Oldpeak"]))
   user_data = {
      "MaxHR": int(data["MaxHR"]),
      "Cholesterol": int(data["Cholesterol"]),
      "FastingBS": int(data["FastingBS"]),
      "Age": int(data["Age"]),
      "Sex": int(data["Sex"]),
      "Oldpeak": HDP.normalize_oldpeak(float(data["Oldpeak"])),
      "ChestPainType": int(data["ChestPainType"]),
      "ExerciseAngina": int(data["ExerciseAngina"]),
      "ST_Slope": int(data["ST_Slope"])
   }
   prediction = HDP.predict(user_data)
   prediction = [int(x) for x in list(prediction)]
   return json.dumps({"prediction": prediction})

@app.route('/model')
def model():
   return render_template("model.html")

@app.route('/about')
def about():
   return render_template("about.html")

if __name__ == '__main__':
    app.run(host="localhost", port=8000)
