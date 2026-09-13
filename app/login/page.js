"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e) {
    e.preventDefault();

    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main style={styles.page}>

      <div style={styles.backgroundGlow}></div>

      <div style={styles.container}>

        {/* MARCA */}
        <div style={styles.brandArea}>

          <div style={styles.logo}>
            <span>IA</span>
            <span style={styles.logoArrow}>↗</span>
          </div>

          <h1 style={styles.brand}>
            IA LUCRATIVA
          </h1>

          <p style={styles.brandSub}>
            TRANSFORME IDEIAS EM RENDA
          </p>

        </div>

        {/* CARD */}
        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <span style={styles.badge}>
              ACESSO À PLATAFORMA
            </span>

            <h2 style={styles.title}>
              Bem-vindo de volta.
            </h2>

            <p style={styles.description}>
              Entre na sua conta para acessar suas ferramentas,
              estratégias e recursos de inteligência artificial.
            </p>

          </div>

          <form onSubmit={entrar}>

            {/* E-MAIL */}
            <div style={styles.field}>

              <label style={styles.label}>
                E-mail
              </label>

              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={carregando}
                style={styles.input}
              />

            </div>

            {/* SENHA */}
            <div style={styles.field}>

              <label style={styles.label}>
                Senha
              </label>

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                disabled={carregando}
                style={styles.input}
              />

            </div>

            {/* ERRO */}
            {erro && (
              <div style={styles.error}>
                <span>!</span>
                {erro}
              </div>
            )}

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={carregando}
              style={{
                ...styles.button,
                opacity: carregando ? 0.65 : 1,
                cursor: carregando
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {carregando
                ? "Entrando..."
                : "Entrar na plataforma →"}
            </button>

          </form>

          {/* CADASTRO */}
          <div style={styles.registerArea}>

            <span style={styles.registerText}>
              Ainda não possui uma conta?
            </span>

            <Link
              href="/cadastro"
              style={styles.registerLink}
            >
              Criar minha conta
            </Link>

          </div>

        </div>

        {/* RODAPÉ */}
        <div style={styles.footer}>

          <span>
            Plataforma IA LUCRATIVA
          </span>

          <span style={styles.footerDot}>
            •
          </span>

          <span>
            @ia.lucrativa1
          </span>

        </div>

      </div>

    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050807",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },

  backgroundGlow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,255,170,0.08), transparent 70%)",
    top: "-220px",
    left: "50%",
    transform: "translateX(-50%)",
    pointerEvents: "none",
  },

  container: {
    width: "100%",
    maxWidth: "430px",
    position: "relative",
    zIndex: 1,
  },

  brandArea: {
    textAlign: "center",
    marginBottom: "25px",
  },

  logo: {
    width: "58px",
    height: "58px",
    margin: "0 auto 14px",
    borderRadius: "16px",
    background: "#00ffaa",
    color: "#03100b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontSize: "18px",
    fontWeight: "900",
    boxShadow:
      "0 0 35px rgba(0,255,170,0.14)",
  },

  logoArrow: {
    position: "absolute",
    right: "7px",
    top: "5px",
    fontSize: "11px",
    fontWeight: "900",
  },

  brand: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  brandSub: {
    margin: "6px 0 0",
    color: "#00a879",
    fontSize: "8px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  card: {
    width: "100%",
    background:
      "linear-gradient(145deg, #0b1110, #080d0b)",
    border:
      "1px solid rgba(0,255,170,0.11)",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box",
    boxShadow:
      "0 25px 80px rgba(0,0,0,0.35)",
  },

  cardHeader: {
    marginBottom: "27px",
  },

  badge: {
    display: "inline-block",
    color: "#00ffaa",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1.3px",
    marginBottom: "13px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    lineHeight: "1.1",
    letterSpacing: "-1px",
    fontWeight: "900",
  },

  description: {
    margin: "12px 0 0",
    color: "#737d78",
    fontSize: "13px",
    lineHeight: "1.65",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "
