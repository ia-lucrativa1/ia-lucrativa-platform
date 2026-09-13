"use client";

import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar(e) {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    alert(
      "Cadastro preparado. A criação real da conta será conectada ao banco de dados na próxima etapa."
    );
  }

  return (
    <main style={styles.container}>
      <section style={styles.card}>
        <div style={styles.logo}>IA LUCRATIVA</div>

        <h1>Crie sua conta</h1>

        <p style={styles.subtitle}>
          Comece agora a usar inteligência artificial para criar oportunidades
          no digital.
        </p>

        <form onSubmit={cadastrar} style={styles.form}>
          <label>Nome</label>

          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>E-mail</label>

          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>

          <input
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Criar minha conta</button>
        </form>

        <p style={styles.bottom}>
          Já possui uma conta?{" "}
          <a href="/login">Entrar</a>
        </p>
      </section>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background:
      "radial-gradient(circle at top, #10202a 0%, #05070a 45%, #020304 100%)",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    padding: "40px 30px",
    borderRadius: "22px",
    background: "#0b1015",
    border: "1px solid #1c2b34",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  },

  logo: {
    color: "#00e5ff",
    fontWeight: "800",
    fontSize: "20px",
    letterSpacing: "1px",
    marginBottom: "30px",
  },

  subtitle: {
    color: "#8c9aa3",
    lineHeight: "1.6",
    marginTop: "10px",
    marginBottom: "28px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  bottom: {
    color: "#7d8991",
    textAlign: "center",
    marginTop: "24px",
    fontSize: "14px",
  },
};
