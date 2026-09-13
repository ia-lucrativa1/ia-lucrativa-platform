"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #172554 0%, #020617 45%, #000 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(15, 23, 42, 0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "800",
              letterSpacing: "-1px",
            }}
          >
            IA LUCRATIVA
          </div>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Crie sua conta e comece sua jornada
          </p>
        </div>

        <form onSubmit={criarConta}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Nome
          </label>

          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#020617",
              color: "#fff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            E-mail
          </label>

          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#020617",
              color: "#fff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Senha
          </label>

          <input
            type="password"
            placeholder="M
