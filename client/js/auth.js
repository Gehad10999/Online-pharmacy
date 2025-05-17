// Toggle between login and register panels
function toggleMode() {
    const container = document.getElementById('container');
    container.classList.toggle('login-mode');
    container.classList.toggle('register-mode');
}



const mockRegister = (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.email && userData.password) {
                resolve({ message: 'Registration successful' });
            } else {
                reject(new Error('Missing required fields'));
            }
        }, 1000);
    });
};

// Login functionality
document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.querySelector('.login-panel input[name="email"]').value.trim();
    const password = document.querySelector('.login-panel input[name="password"]').value.trim();

    if (!email || !password) {
        alert("Please fill in all login fields.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token in localStorage if needed
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Store user type
        if (data.type) {
            localStorage.setItem('type', data.type);
        }

        // Redirect based on user type
        if (data.type === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'products.html';
        }

    } catch (err) {
        console.error('Login error:', err);
        alert(`Login failed: ${err.message}`);
    }
});


// Register functionality
document.getElementById('registerBtn').addEventListener('click', async () => {
    const userData = {
        full_name: document.querySelector('.register-panel input[name="full_name"]').value.trim(),
        phone_number: document.querySelector('.register-panel input[name="phone_number"]').value.trim(),
        email: document.querySelector('.register-panel input[name="email"]').value.trim(),
        password: document.querySelector('.register-panel input[name="password"]').value.trim(),
        type: document.querySelector('.register-panel input[name="type"]').checked ? 'admin' : 'user'
    };

    if (!Object.values(userData).every(field => field !== '')) {
        alert("Please fill in all registration fields.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store token and type if needed
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        if (userData.type) {
            localStorage.setItem('type', userData.type);
        }

        alert('Registration successful!');
        toggleMode(); // switch back to login form
    } catch (err) {
        console.error('Registration error:', err);
        alert(`Registration failed: ${err.message}`);
    }
});
