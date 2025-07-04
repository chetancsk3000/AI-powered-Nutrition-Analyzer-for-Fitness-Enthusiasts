import { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const savePrediction = (result, quantity, navigate, nutritionData) => {
  const user = getAuth().currentUser;
  if (!user) {
    navigate('/login');
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const db = getDatabase();
  const userRef = ref(db, `users/${user.uid}/history/${date}`);

  const fruitName = result.class;
  const nutrients = nutritionData[fruitName];
  const factor = quantity / 100;

  const entry = {
    fruit: fruitName,
    confidence: result.confidence,
    quantity,
    calories: (nutrients.calories * factor).toFixed(2),
    carbs: (nutrients.carbs * factor).toFixed(2),
    protein: (nutrients.protein * factor).toFixed(2),
    fat: (nutrients.fat * factor).toFixed(2),
    timestamp: Date.now()
  };

  push(userRef, entry);
  alert('Prediction saved to history!');
};

const nutritionData = {
  APPLES: { calories: 95, carbs: 25, protein: 0.5, fat: 0.3 },
  BANANA: { calories: 105, carbs: 27, protein: 1.3, fat: 0.3 },
  ORANGE: { calories: 62, carbs: 15.4, protein: 1.2, fat: 0.2 },
  PINEAPPLE: { calories: 82, carbs: 22, protein: 0.9, fat: 0.2 },
  WATERMELON: { calories: 46, carbs: 11.5, protein: 0.9, fat: 0.2 },
};

export default function PredictPage() {
  const [predictions, setPredictions] = useState([
    { image: null, preview: null, result: null, loading: false, quantity: 100 }
  ]);

  const navigate = useNavigate();

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updated = [...predictions];
    updated[index].image = file;
    updated[index].preview = file ? URL.createObjectURL(file) : null;
    updated[index].result = null;
    setPredictions(updated);
  };

  const handleQuantityChange = (e, index) => {
    const updated = [...predictions];
    updated[index].quantity = parseInt(e.target.value) || 0;
    setPredictions(updated);
  };

  const handlePredict = async (index) => {
    const { image } = predictions[index];
    if (!image) return;

    setPredictions(prev => {
      const updated = [...prev];
      updated[index].loading = true;
      return updated;
    });

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('https://ai-powered-nutrition-analyzer-for-mzhp.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      setPredictions(prev => {
        const updated = [...prev];
        updated[index].result = data;
        updated[index].loading = false;
        return updated;
      });

    } catch (err) {
      console.error(err);
      alert('Prediction failed. Make sure your Flask server is running.');
      setPredictions(prev => {
        const updated = [...prev];
        updated[index].loading = false;
        return updated;
      });
    }
  };

  const handleAddFruit = () => {
    setPredictions([...predictions, { image: null, preview: null, result: null, loading: false, quantity: 100 }]);
  };

  const total = predictions.reduce((acc, p) => {
    if (p.result?.class && nutritionData[p.result.class]) {
      const n = nutritionData[p.result.class];
      const factor = p.quantity / 100;
      acc.calories += n.calories * factor;
      acc.carbs += n.carbs * factor;
      acc.protein += n.protein * factor;
      acc.fat += n.fat * factor;
    }
    return acc;
  }, { calories: 0, carbs: 0, protein: 0, fat: 0 });

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <button
        onClick={() => navigate('/history')}
        style={{
          marginBottom: '1rem',
          padding: '10px 20px',
          backgroundColor: '#9c27b0',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        View History
      </button>

      <h2>Upload Fruit Images and Enter Quantity</h2>

      {predictions.map((p, i) => (
        <div key={i} style={{
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: "white",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)"
        }}>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, i)} />
          {p.preview && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img
                src={p.preview}
                alt="Preview"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
              />
            </div>
          )}

          <input
            type="number"
            value={p.quantity}
            onChange={(e) => handleQuantityChange(e, i)}
            placeholder="Enter quantity in grams"
            style={{ marginTop: '1rem', width: '90%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />

          <button
            onClick={() => handlePredict(i)}
            disabled={!p.image || p.loading}
            style={{
              marginTop: '1rem',
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: p.image ? 'pointer' : 'not-allowed',
              opacity: p.image ? 1 : 0.6
            }}
          >
            {p.loading ? 'Predicting...' : 'Predict'}
          </button>

          {p.result && (
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Class:</strong> {p.result.class}</p>
              <p><strong>Confidence:</strong> {(p.result.confidence * 100).toFixed(2)}%</p>

              {nutritionData[p.result.class] && (
                <div style={{ marginTop: '0.5rem' }}>
                  <h4>Nutritional Info (for {p.quantity}g)</h4>
                  <p><strong>Calories:</strong> {(nutritionData[p.result.class].calories * (p.quantity / 100)).toFixed(2)} kcal</p>
                  <p><strong>Carbohydrates:</strong> {(nutritionData[p.result.class].carbs * (p.quantity / 100)).toFixed(2)} g</p>
                  <p><strong>Protein:</strong> {(nutritionData[p.result.class].protein * (p.quantity / 100)).toFixed(2)} g</p>
                  <p><strong>Fat:</strong> {(nutritionData[p.result.class].fat * (p.quantity / 100)).toFixed(2)} g</p>
                </div>
              )}

              <button
                onClick={() => savePrediction(p.result, p.quantity, navigate, nutritionData)}
                style={{
                  marginTop: '1rem',
                  padding: '10px 20px',
                  backgroundColor: '#673ab7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Save to History
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddFruit}
        disabled={!predictions[predictions.length - 1].image}
        style={{
          padding: '10px 20px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: predictions[predictions.length - 1].image ? 'pointer' : 'not-allowed',
          opacity: predictions[predictions.length - 1].image ? 1 : 0.6
        }}
      >
        Add Another Fruit
      </button>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: "white",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)"
      }}>
        <h3>Total Nutritional Intake</h3>
        <p><strong>Calories:</strong> {total.calories.toFixed(2)} kcal</p>
        <p><strong>Carbohydrates:</strong> {total.carbs.toFixed(2)} g</p>
        <p><strong>Protein:</strong> {total.protein.toFixed(2)} g</p>
        <p><strong>Fat:</strong> {total.fat.toFixed(2)} g</p>
      </div>
    </div>
  );
}
