import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
# Feature Selection
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
# Evaluation
from sklearn import metrics
from sklearn.metrics import classification_report
# Typing
from typing import List



class HeartDiseasePredictor:
    def __init__(self, path: str):
        self.df = pd.read_csv(path)
        self.preprocessing()
        features = ["MaxHR", "Cholesterol", "FastingBS", "Age", "Sex", "Oldpeak", "ChestPainType", "ExerciseAngina", "ST_Slope"]
        target = "HeartDisease"
        self.model, X_test, y_test = self.create_model(features, target)
        # y_pred = self.predict(X_test)
        # self.evaluate(y_test, y_pred)


    def replace(self, col_name: str, to_replace: List[str], replace_with: List[int]) -> None:
        self.df[col_name].replace(to_replace, replace_with, inplace=True)
        return

    def preprocessing(self) -> None:
        # Replace categorical values with numerical values
        self.replace("Sex", ['M', 'F'], [1, 0])

        chest_pain_types = self.df["ChestPainType"].unique()
        self.replace("ChestPainType", chest_pain_types, [i for i in range(len(chest_pain_types))])

        resting_ecgs = self.df["RestingECG"].unique()
        self.replace("RestingECG", resting_ecgs, [i for i in range(len(resting_ecgs))])

        self.replace("ExerciseAngina", ['Y', 'N'], [1, 0])

        st_slopes = self.df["ST_Slope"].unique()
        self.replace("ST_Slope", st_slopes, [i for i in range(len(st_slopes))])

        # Normalize Oldpeak values between 0 and 1
        self.min_oldpeak = self.df["Oldpeak"].min()
        self.max_oldpeak = self.df["Oldpeak"].max()
        oldpeaks = self.df["Oldpeak"]
        normalized_oldpeaks = oldpeaks.copy()
        for i in range(len(oldpeaks)):
            normalized_oldpeaks[i] -= self.min_oldpeak
        for i in range(len(oldpeaks)):
            normalized_oldpeaks[i] /= (self.max_oldpeak - self.min_oldpeak)
        self.df["Oldpeak"] = normalized_oldpeaks
        return
    
    def normalize_oldpeak(self, oldpeak: float) -> float:
        normalized_oldpeak = oldpeak - self.min_oldpeak
        normalized_oldpeak /= (self.max_oldpeak - self.min_oldpeak)
        return normalized_oldpeak

    def create_model(self, features: List[str], target: str):
        # Build the Model
        X = self.df[features]  # the chosen features
        Y = self.df[[target]]  # the target output

        # Split the dataset into train adn test
        # TODO: Change these hyperparams?
        X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.4, random_state=100)

        # Logistic Regression was the most accurate during testing
        model = LogisticRegression()
        model.fit(X_train, y_train)
        return model, X_test, y_test

    # x = {"MaxHR": 170, "Cholesterol": 237, "FastingBS": 1, "Age": 60, "Sex": 0, "Oldpeak": 0.5, "ChestPainType": 2, "ExerciseAngina": 1, "ST_Slope": 0}
    def predict(self, x) -> List[int]:
        x = pd.DataFrame([x])
        y = self.model.predict(x)
        return y



def main():
    HDP = HeartDiseasePredictor("data\heart.csv")
    # x = {"FastingBS": 1, "Age": 60, "Sex": 0, "Oldpeak": 0.5, "ChestPainType": 2, "ExerciseAngina": 1, "ST_Slope": 0}
    # x = {"FastingBS": 0, "Age": 60, "Sex": 0, "Oldpeak": 0.5, "ChestPainType": 2, "ExerciseAngina": 1, "ST_Slope": 0}
    # x = {"FastingBS": 0, "Age": 60, "Sex": 0, "Oldpeak": 0, "ChestPainType": 0, "ExerciseAngina": 1, "ST_Slope": 0}
    # y = HDP.predict(x)
    # print(y)

if __name__ == "__main__":
    main()