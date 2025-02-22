function submitTransaction(planId, amount) {
    const transactionId = document.getElementById(`transactionId${planId}`).value;
    const bkashNumber = document.getElementById(`bkashNumber${planId}`).value;

    if (!transactionId || !bkashNumber) {
        alert('Please enter both Transaction ID and bKash Number');
        return;
    }

    // Show processing message
    const submitBtn = document.querySelector(`#transactionId${planId}`).parentElement.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Simulate verification process
    setTimeout(() => {
        alert(`Thank you! Your payment of ৳${amount} is being verified. We will activate your premium features within 24 hours after verification.`);
        
        // Reset form
        document.getElementById(`transactionId${planId}`).value = '';
        document.getElementById(`bkashNumber${planId}`).value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}
