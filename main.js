document.querySelector('.form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const question = document.getElementById('question').value.trim();
    
    if (!question) {
        alert('Please enter a question first!');
        return;
    }

    const submitButton = document.querySelector('.submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const response = await fetch('save_log.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `question=${encodeURIComponent(question)}&deviceId=${encodeURIComponent(localStorage.getItem('deviceId'))}`
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        if (result.success) {
            window.location.href = "thankyou.html";
        } else {
            console.error('Logging failed:', result.error || 'Unknown error');
            // Still proceed to thank you page even if logging fails
            window.location.href = "thankyou.html";
        }
    } catch (error) {
        console.error('Error:', error);
        // Proceed to thank you page even if there's an error
        window.location.href = "thankyou.html";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send!';
    }
});