document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorDiv = document.getElementById('errorMessage');
    
    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        });

        const data = await response.json();
        console.log('Login response:', data);

        if (data.status === 'success' && data.data.token) {
            localStorage.setItem('token', data.data.token);
            console.log('Token saved:', data.data.token);
            
            localStorage.setItem('user', JSON.stringify(data.data.user));
            
            window.location.href = '/admin/dashboard';
        } else {
            errorDiv.textContent = 'Login failed: ' + (data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = 'Error: ' + error.message;
    }
}); 