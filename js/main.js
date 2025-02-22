// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the iframe element
    const aiFrame = document.querySelector('iframe');
    
    // Add a loading state
    aiFrame.addEventListener('load', function() {
        this.style.opacity = '1';
    });

    // Handle any iframe communication if needed
    window.addEventListener('message', function(event) {
        if (event.origin === 'https://tiger-lab-genai-arena.hf.space') {
            console.log('Message from Hugging Face:', event.data);
        }
    });
});
