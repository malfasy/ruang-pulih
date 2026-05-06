// ============================================================
// RuangPulih — Client-side Form Validation
// ============================================================

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
    const input = document.getElementById(fieldId);
    if (input) {
        input.classList.add('border-red-300', 'bg-red-50/50');
    }
}

function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    }
    const input = document.getElementById(fieldId);
    if (input) {
        input.classList.remove('border-red-300', 'bg-red-50/50');
    }
}

function validateRequired(fieldId, label) {
    clearError(fieldId);
    const input = document.getElementById(fieldId);
    if (!input || !input.value.trim()) {
        showError(fieldId, `${label} is required.`);
        return false;
    }
    return true;
}

function validateEmail(fieldId) {
    clearError(fieldId);
    const input = document.getElementById(fieldId);
    if (!input) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(input.value.trim())) {
        showError(fieldId, 'Please enter a valid email address.');
        return false;
    }
    return true;
}

function validateMinLength(fieldId, min, label) {
    clearError(fieldId);
    const input = document.getElementById(fieldId);
    if (!input) return false;
    if (input.value.trim().length < min) {
        showError(fieldId, `${label} must be at least ${min} characters.`);
        return false;
    }
    return true;
}

function validateMatch(fieldId1, fieldId2, label) {
    clearError(fieldId2);
    const input1 = document.getElementById(fieldId1);
    const input2 = document.getElementById(fieldId2);
    if (!input1 || !input2) return false;
    if (input1.value !== input2.value) {
        showError(fieldId2, `${label} does not match.`);
        return false;
    }
    return true;
}

function togglePassword(fieldId, btn) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}
