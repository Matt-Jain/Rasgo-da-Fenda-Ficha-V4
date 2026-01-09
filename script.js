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

const firebaseConfig = {
  apiKey: "AIzaSyAg47iuhmvXmJ_SHxp7k2aUg20wZI4_RHo",
  authDomain: "fronteira-rpg-77819.firebaseapp.com",
  projectId: "fronteira-rpg-77819"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ELEMENTOS
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");

// LOGIN
loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  }
};

logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
    loadCharacters();
  } else {
    loginScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
  }
});

// TABS
window.showTab = id => {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

// SALVAR PERSONAGEM / NPC
window.saveCharacter = async () => {
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
  loadCharacters();
  alert("Salvo!");
};

// LISTAR
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
