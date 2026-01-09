const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const salvarBtn = document.getElementById("salvar");

const listaPersonagens = document.getElementById("listaPersonagens");
const listaNPCs = document.getElementById("listaNPCs");

let personagens = [];

/* LOGIN FAKE */
loginBtn.onclick = () => {
  loginPage.classList.remove("active");
  appPage.classList.add("active");
};

/* LOGOUT */
logoutBtn.onclick = () => {
  appPage.classList.remove("active");
  loginPage.classList.add("active");
};

/* TABS */
document.querySelectorAll("nav button[data-tab]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

/* SALVAR PERSONAGEM */
salvarBtn.onclick = () => {
  const tipo = document.getElementById("tipo").value;
  const nome = document.getElementById("nome").value;
  const jogador = document.getElementById("jogador").value;
  const aparencia = document.getElementById("aparencia").value;
  const historia = document.getElementById("historia").value;

  if (!nome) {
    alert("Nome obrigatório");
    return;
  }

  personagens.push({ tipo, nome, jogador, aparencia, historia });
  atualizarListas();
  alert("Salvo!");
};

/* LISTAR */
function atualizarListas() {
  listaPersonagens.innerHTML = "";
  listaNPCs.innerHTML = "";

  personagens.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${p.nome}</strong><br>${p.jogador || ""}`;

    if (p.tipo === "npc") listaNPCs.appendChild(div);
    else listaPersonagens.appendChild(div);
  });
}

/* DADOS */
function rolarDado(lados) {
  const resultado = Math.floor(Math.random() * lados) + 1;
  document.getElementById("resultadoDado").innerText =
    `Resultado do D${lados}: ${resultado}`;
}


