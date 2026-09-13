"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function criarConta(e) {
    e.preventDefault();

    setErro("");

    if (!nome.trim() || !email.trim() || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: {
        data: {
          nome: nome.trim(),
        },
      },
    });

    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    if (!data.user) {
      setErro("Não foi possível criar a conta.");
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
              CRIE SUA CONTA
            </span>

            <h2 style={styles.title}>
              Comece sua jornada.
            </h2>

            <p style={styles.description}>
              Crie sua conta e tenha acesso às ferramentas,
              estratégias e recursos da IA LUCRATIVA.
            </p>

          </div>

          <form onSubmit={criarConta}>

            {/* NOME */}
            <div style={styles.field}>

              <label style={styles.label}>
                Nome
              </label>

              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
                disabled={carregando}
                style={styles.input}
              />

            </div>

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
                placeholder="Crie uma senha com pelo menos 6 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="new-password"
                disabled={carregando}
                style={styles.input}
              />

            </div>

            {/* ERRO */}
            {erro && (
              <div style={styles.error}>
                <span style={styles.errorIcon}>
                  !
                </span>

                <span>
                  {erro}
                </span>
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
                ? "Criando conta..."
                : "Criar minha conta →"}
            </button>

          </form>

          {/* LOGIN */}
          <div style={styles.loginArea}>

            <span style={styles.loginText}>
              Já possui uma conta?
            </span>

            <Link
              href="/login"
              style={styles.loginLink}
            >
              Entrar na plataforma
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
    letterSpacing: "1.
