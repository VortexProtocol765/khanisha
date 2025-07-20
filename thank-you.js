// thank-you.js
document.addEventListener('DOMContentLoaded', function() {
    // You can add any thank-you page specific JavaScript here if needed
    // For example, you might want to add a click counter animation similar to the main page
    
    // Dice button functionality
    document.querySelector('.dice-button').addEventListener('click', function(e) {
        e.preventDefault();
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        const textarea = document.getElementById('question');
        textarea.value = randomQuestion;
        textarea.focus();
    });
    // Random click counter animation
    setInterval(() => {
        const clickCount = document.querySelector('.clickCount');
        let count = parseInt(clickCount.textContent);
        count += Math.floor(Math.random() * 3) - 1; // Random increment/decrement
        clickCount.textContent = Math.max(0, count); // Ensure it doesn't go negative
    }, 800);
});