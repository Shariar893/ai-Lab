// Load saved settings when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadSavedSettings();

    // Add event listeners for the action buttons
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    document.getElementById('resetSettings').addEventListener('click', resetSettings);

    // Add event listeners for all inputs to enable the save button
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', enableSaveButton);
    });
});

function loadSavedSettings() {
    // Load settings from localStorage if they exist
    const savedSettings = JSON.parse(localStorage.getItem('aiLabSettings')) || getDefaultSettings();
    
    // Apply the saved settings to the form
    Object.entries(savedSettings).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    });
}

function getDefaultSettings() {
    return {
        themeSelect: 'light',
        fontSize: 'medium',
        language: 'en',
        defaultModel: 'balanced',
        responseLength: 'balanced',
        autoSave: true,
        emailNotif: false,
        desktopNotif: true,
        emailAddress: '',
        shareData: false,
        saveHistory: true
    };
}

function saveSettings() {
    // Collect all settings
    const settings = {};
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            settings[input.id] = input.checked;
        } else {
            settings[input.id] = input.value;
        }
    });

    // Save to localStorage
    localStorage.setItem('aiLabSettings', JSON.stringify(settings));

    // Show success message
    showNotification('Settings saved successfully!');

    // Disable save button
    document.getElementById('saveSettings').disabled = true;
}

function resetSettings() {
    // Get default settings
    const defaultSettings = getDefaultSettings();

    // Apply default settings to form
    Object.entries(defaultSettings).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    });

    // Save default settings
    localStorage.setItem('aiLabSettings', JSON.stringify(defaultSettings));

    // Show success message
    showNotification('Settings reset to default!');

    // Disable save button
    document.getElementById('saveSettings').disabled = true;
}

function enableSaveButton() {
    document.getElementById('saveSettings').disabled = false;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.background = '#4f46e5';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s ease-out';

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        notification.addEventListener('animationend', () => {
            notification.remove();
        });
    }, 3000);
}
