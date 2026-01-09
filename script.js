* {
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

body {
  margin: 0;
  background: linear-gradient(180deg, #0f1115, #1b1e25);
}

.hidden { display: none; }

.screen {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: #1f222b;
  padding: 30px;
  border-radius: 14px;
  width: 320px;
  text-align: center;
}

.login-card input {
  width: 100%;
  margin: 8px 0;
  padding: 10px;
  border-radius: 6px;
  border: none;
}

.login-card button {
  width: 100%;
  padding: 10px;
}

header {
  background: #14161c;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 { color: #fff; }

nav button {
  margin-left: 5px;
}

.paper {
  max-width: 900px;
  margin: 20px auto;
  background: #f2f2e9;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0,0,0,0.6);
}

.paper h2 { margin-top: 0; }

input, textarea, select {
  width: 100%;
  padding: 8px;
  margin: 6px 0;
}

.card {
  background: #ddd;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}
