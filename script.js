import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyAg47iuhmvXmJ_SHxp7k2aUg20wZI4_RHo",
  authDomain: "fronteira-rpg-77819.firebaseapp.com",
  projectId: "fronteira-rpg-77819"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ELEMENTOS */
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");

const charType = document.getElementById("charType");
const charName = document.getElementById("charName");
const playerName = document.getElementById("playerName");
const appearance = document.getElementById("appearance");
const history = document.getElementById("history");
const goals = document.getElementById("goals");

const playerList = document.getElementById("playerList");
const npcList = document.getElementById("npcList");

/* LOGIN */
loginBtn.addEventListener("click", async () => {
  loginError.textContent = "";

  if (!emailInput.value || !passwordInput.value) {
    loginError.textContent = "Preencha email e senha.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      try {
        await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      } catch (e) {
        loginError.textContent = e.message;
      }
    } else {
      loginError.textContent = err.message;
    }
  }
});

/* LOGOUT */
logoutBtn.addEventListener("click", () => signOut(auth));

/* AUTH STATE */
onAuthStateChanged(auth, user => {
  if (user) {
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
    showTab("create");
    loadCharacters();
  } else {
    loginScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
  }
});

/* TABS */
window.showTab = id => {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

/* SALVAR */
window.saveCharacter = async () => {
  if (!charName.value) {
    alert("Nome do personagem é obrigatório.");
    return;
  }

  await addDoc(collection(db, "characters"), {
    uid: auth.currentUser.uid,
    type: charType.value,
    name: charName.value,
    player: playerName.value,
    appearance: appearance.value,
    history: history.value,
    goals: goals.value,
    created: Date.now()
  });

  alert("Personagem salvo!");
  loadCharacters();
};

/* LISTAR */
async function loadCharacters() {
  playerList.innerHTML = "";
  npcList.innerHTML = "";

  const snap = await getDocs(collection(db, "characters"));
  snap.forEach(doc => {
    const c = doc.data();
    if (c.uid !== auth.currentUser.uid) return;

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${c.name}</strong>`;

    if (c.type === "npc") npcList.appendChild(div);
    else playerList.appendChild(div);
  });
}
