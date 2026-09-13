"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Cadastro() {
const router = useRouter();

const [nome, setNome] = useState("");
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [carregando, setCarregando] = useState(false);

async function cadastrar(e) {
e.preventDefault();

if (!nome.trim() || !email.trim() || !senha) {
  alert("Preencha todos os campos.");
  return;
}

if (senha.length < 6) {
  alert("A senha precisa ter pelo menos 6 caracteres.");
  return;
}

setCarregando(true);

try {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: senha,
  });

  if (error) {
    alert(error.message);
    setCarregando(false);
    return;
  }

  if (!data.user) {
    alert("Não foi possível criar a conta.");
    setCarregando(false);
    return;
  }

  const { error: perfilError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      nome: nome.trim(),
      email: email.trim(),
      plano: "free",
    });

  if (perfilError) {
    console.error(perfilError);
    alert(
      "A conta foi criada, mas não foi possível salvar o perfil. Tente entrar novamente."
    );
    setCarregando(false);
    return;
  }

  alert("Conta criada com sucesso!");

  router.push("/dashboard");
} catch (error) {
  console.error(error);
  alert("Ocorreu um erro ao criar sua conta.");
  setCarregando(false);
}

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
        disabled={carregando}
        style={styles.input}
      />

      <label>E-mail</label>

      <input
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={carregando}
        style={styles.input}
      />

      <label>Senha</label>

      <input
        type="password"
        placeholder="Crie uma senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        disabled={carregando}
        style={styles.input}
      />

      <button
        type="submit"
        disabled={carregando}
        style={styles.button}
      >
        {carregando ? "Criando conta..." : "Criar minha conta"}
      </button>
    </form>

    <p style={styles.bottom}>
      Já possui uma conta?{" "}
      <a href="/login" style={styles.link}>
        Entrar
      </a>
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

input: {
padding: "14px",
borderRadius: "10px",
border: "1px solid #263640",
background: "#070b0f",
color: "#ffffff",
outline: "none",
fontSize: "15px",
marginBottom: "8px",
},

button: {
marginTop: "10px",
padding: "14px",
borderRadius: "10px",
border: "none",
background: "#00e5ff",
color: "#001014",
fontWeight: "800",
fontSize: "15px",
cursor: "pointer",
},

bottom: {
color: "#7d8991",
textAlign: "center",
marginTop: "24px",
fontSize: "14px",
},

link: {
color: "#00e5ff",
textDecoration: "none",
fontWeight: "700",
},
};
