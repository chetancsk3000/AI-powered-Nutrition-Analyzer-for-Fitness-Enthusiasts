# 🥗 AI-powered Nutrition Analyzer for Fitness Enthusiasts

A smart AI-driven system designed to help fitness enthusiasts track and analyze their daily nutritional intake using food image classification and real-time feedback. This solution combines a powerful deep learning backend with a user-friendly web application built using React.js and Firebase.

---

## 🌐 Live Demo

🔗 [Click here to try the deployed app](https://myapplication-d691d792.web.app/)

---

## 📌 Scenario Focus: Nutrient Analysis and Tracking

This project focuses on **Scenario 2** of the AI-powered nutrition platform:

* Users can log or upload food items.
* AI analyzes macronutrients and micronutrients.
* Real-time feedback helps users adjust their diet.
* Performance metrics are visualized to show progress.

---

## 🛠️ Tech Stack

### 🧠 AI/ML Backend

* Python, TensorFlow, Keras
* Pre-trained models (ResNet50, MobileNetV2, EfficientNetB0)
* ImageDataGenerator for augmentation
* Matplotlib for plotting performance

### 💻 Frontend Web App

* React.js + Vite
* Firebase Authentication (Email/Password Login)
* Firebase Hosting for deployment

---

## 🧪 Model Performance Summary

| Model          | Train Acc | Val Acc | Notes                         |
| -------------- | --------- | ------- | ----------------------------- |
| MobileNetV2    | \~99.8%   | \~98.2% | ✅ Best performance            |
| ResNet50       | \~64.5%   | \~62.0% | Good baseline                 |
| EfficientNetB0 | \~24%     | \~23.6% | ❌ Poor convergence, not saved |

> 📌 Final model selected: **MobileNetV2**

---

## 🖼️ Application Features

### ✅ Authentication

* Firebase-based login system (email & password)
* Secure user sessions

### 📷 Food Analyzer

* Users can upload food images
* AI model classifies the image
* Returns nutrient information and classification label

### 📊 Dashboard (Upcoming)

* Nutrient tracking history
* Personalized suggestions (planned)

---

## 📂 Project Structure

```
NUTRITION-ANALYZER/
├── .idx/
├── .vscode/
├── Dataset/
│   ├── TEST_SET/
│   └── TRAIN_SET/
├── Flask/
│   ├── Sample_Images/
│   ├── static/
│   └── templates/
├── node_modules/
├── public/
├── src/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
├── uploads/
├── app.py
├── requirements.txt
└── README.md
```

---

## 🚀 How to Run Locally

To run the project locally, make sure you have Python, Node.js, and Firebase CLI installed.

### 🔧 1. Set Up the Backend (Flask + TensorFlow)

```bash
cd NUTRITION-ANALYZER

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

### 💻 2. Set Up the Frontend (React + Vite)

```bash
npm install
npm run dev
```

This starts the frontend at [http://localhost:5173](http://localhost:5173).

### ☁️ 3. Deploying with Firebase (Optional)

```bash
firebase login
firebase init
firebase deploy
```

---

## 🌟 Future Improvements

* Upload nutrition data to Firebase for persistent user tracking
* Support OCR to parse text from food labels
* Add voice input and multi-language support
* Integrate with fitness trackers (Google Fit, Apple Health)

---

## 🤝 Contributions

Pull requests and feature ideas are welcome! Feel free to fork and enhance the platform.

---

## 📄 License

This project is licensed under the MIT License.
