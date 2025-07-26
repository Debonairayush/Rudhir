// Import the functions you need from the SDKs you need
// Import the required Firebase authentication SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCwtMEdDTKjO3M4JkJE7nTE4fi7-zRx5Qc",
  authDomain: "rudhir-ea9b2.firebaseapp.com",
  databaseURL: "https://rudhir-ea9b2-default-rtdb.firebaseio.com",
  projectId: "rudhir-ea9b2",
  storageBucket: "rudhir-ea9b2.firebasestorage.app",
  messagingSenderId: "916172406860",
  appId: "1:916172406860:web:1ed947d5767ef5f32d74e9",
  measurementId: "G-EYR8G8XV9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// UI Elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle between sign-up and sign-in forms
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Handle Sign Up Form Submission
const signUpForm = document.querySelector('.sign-up form');
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = signUpForm.querySelector('input[name="name"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;
    const confirmPassword = signUpForm.querySelector('input[name="confirm_password"]').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // You could store additional user information here
        // For example, using Firestore or Realtime Database
        
        alert("Account created successfully!");
        window.location.href = "index.html"; // Redirect to homepage or dashboard
    } catch (error) {
        alert("Error creating account: " + error.message);
        console.error(error);
    }
});

// Handle Sign In Form Submission
const signInForm = document.querySelector('.sign-in form');
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = signInForm.querySelector('input[name="login_email"]').value;
    const password = signInForm.querySelector('input[name="login_password"]').value;
    
    try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        alert("Signed in successfully!");
        window.location.href = "index.html"; // Redirect to homepage or dashboard
    } catch (error) {
        alert("Error signing in: " + error.message);
        console.error(error);
    }
});

// Check authentication state on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you might want to redirect them
        console.log("User is signed in:", user);
        // Uncomment below to redirect already logged in users
        // window.location.href = "index.html";
    } else {
        // User is signed out
        console.log("No user is signed in.");
    }
});

// Password Reset Functionality (for the "Forget Your Password?" link)
const forgotPasswordLink = document.querySelector('.sign-in a');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt("Please enter your email to reset your password:");
    
    if (email) {
        // Import the sendPasswordResetEmail function if you want to implement this feature
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert("Password reset email sent! Check your inbox.");
          })
          .catch((error) => {
            alert("Error: " + error.message);
          });
        
        // For now, just show a placeholder message
        alert("Password reset functionality not implemented yet. Would send email to: " + email);
    }
});