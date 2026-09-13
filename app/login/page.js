"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e) {
    e.preventDefault();

    setErro("");

    if (!email.trim() || !senha.trim()) {
      setErro("Preencha seu e-mail e sua senha.");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    if (error) {
      setCarregando(false);

      if (error.message.includes("Invalid login credentials")) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Não foi possível entrar. Tente novamente.");
      }

      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <a href="/" style={styles.back}>
          ← Voltar para o início
        </a>

        <section style={styles.card}>

          <div style={styles.logo}>
            IA
          </div>

          <h1 style={styles.title}>
            Bem-vindo à IA LUCRATIVA
          </h1>

          <p style={styles.subtitle}>
            Entre na sua conta para acessar sua plataforma.
          </p>

          <form onSubmit={entrar}>

            <label style={styles.label}>
              E-mail
            </label>

            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={carregando}
            />

            <label style={styles.label}>
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={styles.input}
              disabled={carregando}
            />

            {erro && (
              <div style={styles.error}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: carregando ? 0.6 : 1,
              }}
              disabled={carregando}
            >
              {carregando
                ? "Entrando..."
                : "Entrar na plataforma →"}
            </button>

          </form>

          <div style={styles.divider}>
            OU
          </div>

          <div style={styles.info}>
            <strong>
              🚀 IA LUCRATIVA
            </strong>

            <p style={styles.infoText}>
              Ferramentas, estratégias e inteligência artificial
              para transformar ideias em oportunidades.
            </p>
          </div>

        </section>

        <footer style={styles.footer}>
          IA LUCRATIVA
          <br />
          @ia.lucrativa1
        </footer>

      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#ffffff",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: "460px",
  },

  back: {
    display: "inline-block",
    color: "#888",
    textDecoration: "none",
    fontSize: "14px",
    marginBottom: "35px",
  },

  card: {
    background: "#101010",
    border: "1px solid #242424",
    borderRadius: "20px",
    padding: "35px 28px",
  },

  logo: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "900",
    margin: "0 auto 25px",
  },

  title: {
    textAlign: "center",
    fontSize: "27px",
    lineHeight: "1.2",
    margin: "0 0 12px",
  },

  subtitle: {
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 30px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "18px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#080808",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },

  error: {
    background: "#1a0b0b",
    border: "1px solid #3a1c1c",
    color: "#ff8c8c",
    padding: "12px",
    borderRadius: "9px",
    fontSize: "13px",
    marginTop: "15px",
  },

  button: {
    width: "100%",
    marginTop: "24px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },

  divider: {
    textAlign: "center",
    color: "#555",
    fontSize: "11px",
    margin: "28px 0",
  },

  info: {
    background: "#0b0b0b",
    border: "1px solid #202020",
    borderRadius: "12px",
    padding: "17px",
    textAlign: "center",
  },

  infoText: {
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.6",
    margin: "8px 0 0",
  },

  footer: {
    textAlign: "center",
    color: "#555",
    fontSize: "12px",
    lineHeight: "1.8",
    padding: "25px 0",
  },
};
