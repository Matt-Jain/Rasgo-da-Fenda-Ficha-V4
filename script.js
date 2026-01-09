import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 CONFIG FIREBASE (SEU)
const firebaseConfig = {
  apiKey: "AIzaSyAg47iuhmvXmJ_SHxp7k2aUg20wZI4_RHo",
  authDomain: "fronteira-rpg-77819.firebaseapp.com",
  projectId: "fronteira-rpg-77819"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ELEMENTOS
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");

// LOGIN / CADASTRO
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  loginError.textContent = "";

  if (!email || !password) {
    loginError.textContent = "Preencha email e senha.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      loginError.textContent = e.message;
    }
  }
});

// LOGOUT
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// ESTADO DE LOGIN
onAuthStateChanged(auth, user => {
  if (user) {
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
  } else {
    loginScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
  }
});
