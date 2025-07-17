// Chat functionality
let isTyping = false;

// Healthcare responses database
const healthcareResponses = {
    greetings: [
        "Hello! I'm here to help with your health questions. What would you like to know?",
        "Hi there! How can I assist you with your health concerns today?",
        "Welcome! I'm ready to provide health information and guidance. What's on your mind?"
    ],
    symptoms: {
        flu: "Common flu symptoms include fever, body aches, fatigue, cough, sore throat, runny nose, and headache. If symptoms persist or worsen, please consult a healthcare provider.",
        headache: "Headaches can be caused by stress, dehydration, lack of sleep, or tension. Try resting in a quiet, dark room, staying hydrated, and applying a cold or warm compress. Seek medical attention if headaches are severe or frequent.",
        fever: "A fever is your body's natural response to infection. Stay hydrated, rest, and monitor your temperature. Seek medical care if fever exceeds 103°F (39.4°C) or persists for more than 3 days.",
        cough: "Coughs can be dry or productive and may indicate various conditions. Stay hydrated, use a humidifier, and avoid irritants. Consult a doctor if cough persists for more than 2 weeks or is accompanied by blood."
    },
    nutrition: {
        diet: "A healthy diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugar, and excessive sodium. Stay hydrated and eat regular, balanced meals.",
        weight: "Healthy weight management involves balanced nutrition and regular physical activity. Focus on sustainable lifestyle changes rather than quick fixes. Consult a healthcare provider for personalized advice."
    },
    lifestyle: {
        sleep: "Good sleep hygiene includes maintaining a regular sleep schedule, creating a comfortable sleep environment, avoiding screens before bedtime, and limiting caffeine intake. Adults need 7-9 hours of sleep per night.",
        stress: "Manage stress through regular exercise, meditation, deep breathing, adequate sleep, and social support. Consider professional help if stress becomes overwhelming or affects daily functioning.",
        exercise: "Regular physical activity improves cardiovascular health, strengthens muscles and bones, and boosts mental health. Aim for at least 150 minutes of moderate-intensity exercise per week."
    }
};

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    // Enter key to send message
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize input
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '' || isTyping) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Show typing indicator and generate response
    showTypingIndicator();
    setTimeout(() => {
        const response = generateResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // Random delay for realism
}

function sendQuickMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    sendMessage();
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `<p>${text}</p>`;
    } else {
        messageDiv.innerHTML = `<p>${text}</p>`;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

function showTypingIndicator() {
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span style="font-size: 0.9rem; opacity: 0.7;">Kare is typing...</span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return getRandomResponse(healthcareResponses.greetings);
    }
    
    // Symptom-related responses
    if (lowerMessage.includes('flu') || lowerMessage.includes('influenza')) {
        return healthcareResponses.symptoms.flu;
    }
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
        return healthcareResponses.symptoms.headache;
    }
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
        return healthcareResponses.symptoms.fever;
    }
    
    if (lowerMessage.includes('cough') || lowerMessage.includes('coughing')) {
        return healthcareResponses.symptoms.cough;
    }
    
    // Nutrition responses
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('eat')) {
        return healthcareResponses.nutrition.diet;
    }
    
    if (lowerMessage.includes('weight') || lowerMessage.includes('lose weight') || lowerMessage.includes('gain weight')) {
        return healthcareResponses.nutrition.weight;
    }
    
    // Lifestyle responses
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
        return healthcareResponses.lifestyle.sleep;
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
        return healthcareResponses.lifestyle.stress;
    }
    
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
        return healthcareResponses.lifestyle.exercise;
    }
    
    // Emergency keywords
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('severe pain')) {
        return "If you're experiencing a medical emergency, please call emergency services immediately (911 in the US). For urgent but non-emergency situations, contact your healthcare provider or visit an urgent care center.";
    }
    
    // Medication questions
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('drug')) {
        return "I can provide general information about medications, but I cannot prescribe or recommend specific medications. Always consult with a healthcare provider or pharmacist for medication-related questions and follow their instructions carefully.";
    }
    
    // Mental health
    if (lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('mental health')) {
        return "Mental health is just as important as physical health. If you're struggling with depression, anxiety, or other mental health concerns, please reach out to a mental health professional. There are also crisis hotlines available 24/7 for immediate support.";
    }
    
    // Default response
    return "I understand you're asking about " + extractKeywords(message) + ". While I can provide general health information, I recommend consulting with a healthcare professional for personalized medical advice. Is there a specific aspect of your health concern you'd like me to address?";
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function extractKeywords(message) {
    const words = message.toLowerCase().split(' ');
    const healthKeywords = ['pain', 'symptoms', 'treatment', 'health', 'medical', 'doctor', 'hospital', 'medicine'];
    const found = words.filter(word => healthKeywords.includes(word));
    return found.length > 0 ? found.join(', ') : 'your health concern';
}

// Add CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-blue);
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .quick-action-btn {
        background: white;
        border: 2px solid var(--light-gray);
        padding: 0.75rem 1rem;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        color: var(--dark-blue);
    }
    
    .quick-action-btn:hover {
        border-color: var(--primary-blue);
        background: var(--primary-blue);
        color: white;
        transform: translateY(-2px);
        box-shadow: var(--shadow);
    }
`;
document.head.appendChild(style);

