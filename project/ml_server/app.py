from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import operator

# --- 1. Load the Model ---
# This loads a pre-trained model for emotion classification.
# It happens only once when the server starts.
# top_k=None ensures we get scores for ALL emotions.
classifier = pipeline("text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None)

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# --- 2. Helper function to format the model's output ---
def format_emotions(model_output):
    emotions = {}
    for emotion_data in model_output[0]:
        # Convert score to a percentage and round it
        emotions[emotion_data['label']] = round(emotion_data['score'] * 100)
    return emotions

# --- THIS IS THE CORRECTED ROUTE ---
@app.route('/api/analyze/sentiment', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # --- 3. Run the analysis ---
    model_output = classifier(text)
    emotions = format_emotions(model_output)

    # --- 4. Determine the primary sentiment and create the final result ---
    # Find the emotion with the highest score
    primary_emotion = max(emotions.items(), key=operator.itemgetter(1))[0]
    confidence = emotions[primary_emotion]

    # Map the primary emotion to a simpler sentiment (positive, negative, neutral)
    sentiment = "Neutral"
    positive_emotions = ["admiration", "amusement", "approval", "caring", "desire", "excitement", "gratitude", "joy", "love", "optimism", "pride", "relief"]
    negative_emotions = ["anger", "annoyance", "disappointment", "disapproval", "disgust", "embarrassment", "fear", "grief", "nervousness", "remorse", "sadness"]
    
    if primary_emotion in positive_emotions:
        sentiment = "Positive"
    elif primary_emotion in negative_emotions:
        sentiment = "Negative"

    # --- 5. Build the final JSON response to match your frontend ---
    final_result = {
        "text": text,
        "sentiment": sentiment,
        "confidence": confidence,
        "emotions": emotions,
        "explanation": f"The text predominantly expresses {primary_emotion}.",
        "detectedLanguage": "en" # Placeholder for now
    }

    return jsonify(final_result)


if __name__ == '__main__':
    app.run(port=5001, debug=True)
