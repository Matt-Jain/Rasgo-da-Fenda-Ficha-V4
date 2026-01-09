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

/* FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyAg47iuhmvXmJ_SHxp7k2aUg20wZI4_RHo",
  authDomain: "fronteira-rpg-77819.firebaseapp.com",
  projectId: "fronteira-rpg-77819"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* PAGES */
const loginPage = document.getElementById("login-page");
const appPage = document.getElementById("app-page");

/* LOGIN */
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");

/* CREATE */
const charType = document.getElementById("charType");
const charName = document.getElementById("charName");
const playerName = document.getElementById("playerName");
const appearance = document.getElementById("appearance");
const history = document.getElementById("history");
const goals = document.getElementById("goals");
const saveBtn = document.getElementById("saveCharBtn");

/* LISTS */
const playerList = document.getElementById("playerList");
const npcList = document.getElementById("npcList");

/* LOGIN ACTION */
loginBtn.onclick = async () => {
  loginError.textContent = "";
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (e) {
    if (e.code === "auth/user-not-found") {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    } else {
      loginError.textContent = e.message;
    }
  }
};

/* AUTH STATE */
onAuthStateChanged(auth, user => {
  if (user) {
    loginPage.classList.remove("active");
    appPage.classList.add("active");
    loadCharacters();
  } else {
    loginPage.classList.add("active");
    appPage.classList.remove("active");
  }
});

/* LOGOUT */
logoutBtn.onclick = () => signOut(auth);

/* TABS */
document.querySelectorAll("nav button[data-tab]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

/* SAVE CHARACTER */
saveBtn.onclick = async () => {
  if (!charName.value) return alert("Nome obrigatório");

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

  alert("Salvo!");
  loadCharacters();
};

/* LOAD */
async function loadCharacters() {
  playerList.innerHTML = "";
  npcList.innerHTML = "";

  const snap = await getDocs(collection(db, "characters"));
  snap.forEach(d => {
    const c = d.data();
    if (c.uid !== auth.currentUser.uid) return;

    const div = document.createElement("div");
    div.className = "card";
    div.textContent = c.name;

    if (c.type === "npc") npcList.appendChild(div);
    else playerList.appendChild(div);
  });
}

