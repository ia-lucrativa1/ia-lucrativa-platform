"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
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
            Acesse sua plataforma de inteligência artificial
          </p>
        </div>

        <form onSubmit={entrar}>
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
            autoComplete="email"
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
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
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

          {erro && (
            <div
              style={{
                background: "rgba(127, 29, 29, 0.35)",
                border: "1px solid rgba(248,113,113,0.35)",
                color: "#fca5a5",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "16px",
              cursor: carregando ? "not-allowed" : "pointer",
              opacity: carregando ? 0.7 : 1,
            }}
          >
            {carregando ? "Entrando..." : "Entrar na plataforma"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Ainda não possui uma conta?
        </div>

        <button
          onClick={() => router.push("/cadastro")}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "13px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "transparent",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Criar minha conta
        </button>
      </div>
    </main>
  );
}
