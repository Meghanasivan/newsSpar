// Show the Sign Up form
function showSignUp() {
    document.getElementById('signUpForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

// Show the Login form
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
}

// Handle Sign Up form submission
document.getElementById('signUp').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    // Save user data to localStorage (temporary for demo purposes)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    alert('Sign Up Successful!');
    // Redirect to Login page
    showLogin();
});

// Handle Login form submission
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login Successful!');
        // Redirect to index page
        window.location.href = 'index.html'; // Change 'index.html' to your actual homepage
    } else {
        alert('Invalid email or password!');
    }
});
