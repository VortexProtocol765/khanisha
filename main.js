document.addEventListener('DOMContentLoaded', function() {
    // Generate or retrieve device ID
    if (!localStorage.getItem('deviceId')) {
        localStorage.setItem('deviceId', generateDeviceId());
    }
    document.getElementById('deviceId').value = localStorage.getItem('deviceId');

    // Get user IP address and other info
    collectUserData();

    // Sample questions for dice button
    const sampleQuestions = [
        "Do you like anyone right now?",
        "Are you single?",
        "What are you doing later?",
        "Do you believe in second chances?",
        "How tall are you?",
        "Are you talking to anyone?",
        "Do you prefer texting or facetime?"
    ];

    // Dice button functionality
    document.querySelector('.dice-button').addEventListener('click', function(e) {
        e.preventDefault();
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        const textarea = document.getElementById('question');
        textarea.value = randomQuestion;
        textarea.focus();
        
        // Hide placeholder when question is added
        document.querySelector('.textarea-placeholder').style.display = 'none';
    });

    // Textarea focus/blur handling
    const textarea = document.getElementById('question');
    const placeholder = document.querySelector('.textarea-placeholder');
    
    textarea.addEventListener('focus', function() {
        placeholder.style.display = 'none';
    });
    
    textarea.addEventListener('blur', function() {
        if (!this.value.trim()) {
            placeholder.style.display = 'block';
        }
    });

    // Form submission
    document.querySelector('.form').addEventListener('submit', function(e) {
        e.preventDefault();
        const question = document.getElementById('question').value.trim();
        
        if (!question) {
            alert('Please enter a question first!');
            return;
        }

        const submitButton = document.querySelector('.submit');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Submit the form (Formspree will handle the rest)
        e.target.submit();

        // Random click counter animation
        setInterval(() => {
            const clickCount = document.querySelector('.clickCount');
            if (clickCount) {
                let count = parseInt(clickCount.textContent);
                count += Math.floor(Math.random() * 3) - 1;
                clickCount.textContent = Math.max(0, count);
            }
        }, 800);
    });

    // Function to generate device ID
    function generateDeviceId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Function to collect user data (IP, location, etc.)
    function collectUserData() {
        // Get IP address and location
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                document.getElementById('userIp').value = data.ip;
                document.getElementById('userLocation').value = 
                    `${data.city}, ${data.region}, ${data.country_name}`;
            })
            .catch(() => {
                // Fallback if ipapi fails
                fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('userIp').value = data.ip;
                    })
                    .catch(() => {
                        document.getElementById('userIp').value = 'Unknown';
                    });
            });

        // Get user agent
        document.getElementById('userAgent').value = navigator.userAgent;

        // Get screen resolution
        document.getElementById('screenResolution').value = 
            `${window.screen.width}x${window.screen.height}`;

        // Get timezone
        document.getElementById('timezone').value = 
            Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
});